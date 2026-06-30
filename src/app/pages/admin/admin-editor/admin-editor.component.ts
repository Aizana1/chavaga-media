import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { AuthService } from '../../../services/auth.service';
import { ArticleStoreService } from '../../../services/article-store.service';
import { Article } from '../../../models/article.model';
import { RUBRIC_SLUGS } from '../../../data/rubrics.data';
import { TRANSLATIONS } from '../../../models/translations';

type BlockType = 'heading' | 'paragraph' | 'image';

interface EditorBlock {
  type: BlockType;
  rus: string;
  tuv: string;
  url: string; // только для image
}

@Component({
  selector: 'app-admin-editor',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule],
  templateUrl: './admin-editor.component.html',
  styleUrl: './admin-editor.component.scss',
})
export class AdminEditorComponent implements OnInit {
  private auth = inject(AuthService);
  private store = inject(ArticleStoreService);
  private router = inject(Router);
  private sanitizer = inject(DomSanitizer);

  // 'video' исключаем — у этой рубрики своя страница без статей.
  rubricOptions = RUBRIC_SLUGS
    .map((slug, i) => ({ slug, label: TRANSLATIONS.rus.rubrics.items[i]?.label ?? slug }))
    .filter(o => o.slug !== 'video');

  rubricSlug = signal('');
  titleRus = signal('');
  titleTuv = signal('');
  dateRus = signal('');
  dateTuv = signal('');
  mainImage = signal('');
  blocks = signal<EditorBlock[]>([]);

  previewLang = signal<'rus' | 'tuv'>('rus');
  publishing = signal(false);
  message = signal('');
  error = signal('');

  // Список уже опубликованных статей (из Firestore).
  published = signal<Article[]>([]);
  loadingList = signal(false);
  deletingId = signal<string | null>(null);

  userEmail = computed(() => this.auth.user()?.email ?? '');

  ngOnInit() {
    this.loadPublished();
  }

  async loadPublished() {
    this.loadingList.set(true);
    try {
      this.published.set(await this.store.getAll());
    } catch {
      this.published.set([]);
    } finally {
      this.loadingList.set(false);
    }
  }

  rubricLabel(slug: string): string {
    return this.rubricOptions.find(o => o.slug === slug)?.label ?? slug;
  }

  async deleteArticle(article: Article) {
    if (this.deletingId()) return;
    const ok = confirm(`Удалить статью «${article.title.rus || article.title.tuv}»? Это действие необратимо.`);
    if (!ok) return;

    this.deletingId.set(article.id);
    this.message.set('');
    this.error.set('');
    try {
      await this.store.delete(article.id);
      this.published.update(list => list.filter(a => a.id !== article.id));
      this.message.set('Статья удалена.');
    } catch (e) {
      console.error(e);
      this.error.set('Не удалось удалить статью. Проверьте подключение и права доступа.');
    } finally {
      this.deletingId.set(null);
    }
  }

  canPublish = computed(
    () =>
      !!this.rubricSlug() &&
      this.titleRus().trim().length > 0 &&
      this.titleTuv().trim().length > 0 &&
      this.blocks().some(b =>
        b.type === 'image' ? b.url.trim() : b.rus.trim() || b.tuv.trim()
      )
  );

  previewBody = computed((): SafeHtml =>
    this.sanitizer.bypassSecurityTrustHtml(this.assembleBody(this.previewLang()))
  );

  previewTitle = computed(() =>
    this.previewLang() === 'rus' ? this.titleRus() : this.titleTuv()
  );

  // --- блоки ---
  addBlock(type: BlockType) {
    this.blocks.update(list => [...list, { type, rus: '', tuv: '', url: '' }]);
  }

  removeBlock(index: number) {
    this.blocks.update(list => list.filter((_, i) => i !== index));
  }

  moveBlock(index: number, dir: -1 | 1) {
    const target = index + dir;
    this.blocks.update(list => {
      if (target < 0 || target >= list.length) return list;
      const copy = [...list];
      [copy[index], copy[target]] = [copy[target], copy[index]];
      return copy;
    });
  }

  updateBlock(index: number, field: 'rus' | 'tuv' | 'url', value: string) {
    this.blocks.update(list =>
      list.map((b, i) => (i === index ? { ...b, [field]: value } : b))
    );
  }

  /** Стабильный trackBy по индексу — чтобы поля ввода не пересоздавались и не теряли фокус. */
  trackByIndex(index: number): number {
    return index;
  }

  /**
   * Оборачивает выделенный в поле текст в тег <b>/<i>/<s>.
   * Если ничего не выделено — ничего не делает.
   */
  wrapSelection(
    el: HTMLTextAreaElement | HTMLInputElement,
    index: number,
    field: 'rus' | 'tuv',
    tag: 'b' | 'i' | 's'
  ) {
    const start = el.selectionStart ?? 0;
    const end = el.selectionEnd ?? 0;
    if (start === end) return;

    const value = el.value;
    const selected = value.slice(start, end);
    const wrapped = `<${tag}>${selected}</${tag}>`;
    const newValue = value.slice(0, start) + wrapped + value.slice(end);

    this.updateBlock(index, field, newValue);

    // Восстанавливаем фокус и выделение (уже внутри тегов).
    const openLen = tag.length + 2; // <b>
    setTimeout(() => {
      el.focus();
      el.selectionStart = start + openLen;
      el.selectionEnd = end + openLen;
    });
  }

  blockLabel(type: BlockType): string {
    return type === 'heading' ? 'Подзаголовок' : type === 'paragraph' ? 'Параграф' : 'Фотография';
  }

  // --- сборка HTML ---
  private assembleBody(lang: 'rus' | 'tuv'): string {
    return this.blocks()
      .map(b => {
        const text = (b[lang] ?? '').trim();
        if (b.type === 'heading') return text ? `<h3>${text}</h3>` : '';
        if (b.type === 'paragraph') return text ? `<p>${text}</p>` : '';
        if (b.type === 'image') {
          const url = b.url.trim();
          if (!url) return '';
          const caption = text ? `<figcaption>${text}</figcaption>` : '';
          return `<figure><img src="${url}" alt="${text}">${caption}</figure>`;
        }
        return '';
      })
      .filter(Boolean)
      .join('\n');
  }

  async publish() {
    if (!this.canPublish() || this.publishing()) return;
    this.publishing.set(true);
    this.message.set('');
    this.error.set('');

    const article: Omit<Article, 'id'> = {
      rubricSlug: this.rubricSlug(),
      title: { rus: this.titleRus().trim(), tuv: this.titleTuv().trim() },
      body: { rus: this.assembleBody('rus'), tuv: this.assembleBody('tuv') },
    };
    if (this.mainImage().trim()) {
      article.image = this.mainImage().trim();
    }
    if (this.dateRus().trim() || this.dateTuv().trim()) {
      article.date = { rus: this.dateRus().trim(), tuv: this.dateTuv().trim() };
    }

    try {
      await this.store.publish(article);
      this.message.set('Статья опубликована! Она появится в выбранной рубрике.');
      this.resetForm();
      this.loadPublished();
    } catch (e) {
      console.error(e);
      this.error.set('Не удалось опубликовать. Проверьте настройку Firebase и правила Firestore.');
    } finally {
      this.publishing.set(false);
    }
  }

  private resetForm() {
    this.titleRus.set('');
    this.titleTuv.set('');
    this.dateRus.set('');
    this.dateTuv.set('');
    this.mainImage.set('');
    this.blocks.set([]);
  }

  async logout() {
    await this.auth.logout();
    this.router.navigate(['/admin/login']);
  }
}
