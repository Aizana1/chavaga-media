import { Component, computed, ElementRef, inject, OnInit, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { LanguageService } from '../../services/language.service';
import { Article } from '../../models/article.model';
import { ARTICLES } from '../../data/articles.data';
import { RUBRIC_SLUGS } from '../../data/rubrics.data';

@Component({
  selector: 'app-rubric-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rubric-detail.component.html',
  styleUrl: './rubric-detail.component.scss',
})
export class RubricDetailComponent implements OnInit {
  lang = inject(LanguageService);
  route = inject(ActivatedRoute);
  sanitizer = inject(DomSanitizer);

  @ViewChild('articleRef') articleRef?: ElementRef<HTMLElement>;

  readonly ITEMS_PER_PAGE = 5;

  slug = signal('');
  allArticles = signal<Article[]>([]);
  currentPage = signal(0);
  selectedArticle = signal<Article | null>(null);

  currentPageArticles = computed(() => {
    const start = this.currentPage() * this.ITEMS_PER_PAGE;
    return this.allArticles().slice(start, start + this.ITEMS_PER_PAGE);
  });

  totalPages = computed(() =>
    Math.ceil(this.allArticles().length / this.ITEMS_PER_PAGE)
  );

  hasPrev = computed(() => this.currentPage() > 0);
  hasNext = computed(() => this.currentPage() < this.totalPages() - 1);

  rubricTitle = computed(() => {
    const idx = RUBRIC_SLUGS.indexOf(this.slug());
    if (idx === -1) return '';
    return this.lang.translations().rubrics.items[idx]?.label ?? '';
  });

  rubricIcon = computed(() => {
    const idx = RUBRIC_SLUGS.indexOf(this.slug());
    return idx >= 0 ? `assets/images/rubrics${idx + 1}.svg` : '';
  });

  currentLang = computed(() => this.lang.language());

  safeBody = computed((): SafeHtml => {
    const article = this.selectedArticle();
    if (!article) return '';
    return this.sanitizer.bypassSecurityTrustHtml(article.body[this.currentLang()]);
  });

  ngOnInit() {
    this.route.params.subscribe(params => {
      const slug = params['slug'] ?? '';
      this.slug.set(slug);
      this.allArticles.set(ARTICLES.filter(a => a.rubricSlug === slug));
      this.currentPage.set(0);
      this.selectedArticle.set(null);
    });
  }

  toggleArticle(article: Article) {
    const opening = this.selectedArticle()?.id !== article.id;
    this.selectedArticle.set(opening ? article : null);
    if (opening) {
      setTimeout(() => {
        this.articleRef?.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
    }
  }

  prevPage() {
    if (this.hasPrev()) {
      this.currentPage.update(p => p - 1);
      this.selectedArticle.set(null);
    }
  }

  nextPage() {
    if (this.hasNext()) {
      this.currentPage.update(p => p + 1);
      this.selectedArticle.set(null);
    }
  }

  paragraphs(text: string): string[] {
    return text
      .split(/\n\n|<br\s*\/?>/gi)
      .filter(p => p.trim().length > 0);
  }
}
