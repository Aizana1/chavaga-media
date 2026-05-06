import { Component, computed, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';

interface Comic {
  title: { rus: string; tuv: string };
  pages: { rus: string[]; tuv: string[] };
}

const COMICS: Comic[] = [
  {
    title: {
      rus: 'Алдынай и ее первые месячные',
      tuv: 'Алдынай биле бир дугаар ай демдээ',
    },
    pages: {
      rus: [
        'https://media.chavaga-media.com/comics/aldynai-mesyachnye/Frame%2042.svg',
      ],
      tuv: [
        'https://media.chavaga-media.com/comics/aldynai-mesyachnye/Frame%2043.svg',
      ],
    },
  },
  {
    title: {
      rus: 'Старшие сестры',
      tuv: 'Улуг угбалар',
    },
    pages: {
      rus: [
        'https://media.chavaga-media.com/comics/starshie-sestry/Frame%2044.svg',
      ],
      tuv: [
        'https://media.chavaga-media.com/comics/starshie-sestry/Frame%2045.svg',
      ],
    },
  },
  {
    title: {
      rus: 'Алдынай и ее первая любовь',
      tuv: 'Алдынайнын бир дугаар ынакшылы',
    },
    pages: {
      rus: [
        'https://media.chavaga-media.com/comics/aldynai-pervaya-lyubov/Frame%2047.svg',
      ],
      tuv: [
        'https://media.chavaga-media.com/comics/aldynai-pervaya-lyubov/Frame%2048.svg',
      ],
    },
  },
];

@Component({
  selector: 'app-comics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './comics.component.html',
  styleUrl: './comics.component.scss',
})
export class ComicsComponent {
  lang = inject(LanguageService);

  comics = COMICS;
  selectedIndex = signal<number | null>(null);

  currentLang = computed(() => this.lang.language() as 'rus' | 'tuv');

  constructor() {
    effect(() => {
      const lang = this.currentLang();
      COMICS.forEach(comic => {
        comic.pages[lang].forEach(src => {
          new Image().src = src;
        });
      });
    });
  }

  toggle(index: number) {
    this.selectedIndex.set(this.selectedIndex() === index ? null : index);
  }

  selectedComic = computed(() => {
    const i = this.selectedIndex();
    return i !== null ? this.comics[i] : null;
  });

  selectedPages = computed(() => {
    const comic = this.selectedComic();
    if (!comic) return [];
    return comic.pages[this.currentLang()];
  });
}
