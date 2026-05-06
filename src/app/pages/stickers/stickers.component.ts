import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { LanguageService } from '../../services/language.service';

const CONTENT = {
  rus: {
    title: 'СТИКЕРЫ',
    telegramBtn: 'ССЫЛКА НА СТИКЕР ПАК В ТЕЛЕГРАММ',
    shopText: 'СТИКЕРЫ МОЖНО ПРИОБРЕСТИ&nbsp;В ГАСТРО-КОФЕЙНЕ&nbsp;«ТАРАА»',
  },
  tuv: {
    title: 'СТИКЕРЛЕР',
    telegramBtn: 'ТЕЛЕГРАМДА СТИКЕР ПАКЧЕ ССЫЛКА',
    shopText: 'СТИКЕРЛЕРНИ «ТАРАА»&nbsp;ГАСТРО-КОФЕЙНЯДАН САДЫП АЛЫП БОЛУР',
  },
};

@Component({
  selector: 'app-stickers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stickers.component.html',
  styleUrl: './stickers.component.scss',
})
export class StickersComponent {
  lang = inject(LanguageService);
  private sanitizer = inject(DomSanitizer);

  currentLang = computed(() => this.lang.language() as 'rus' | 'tuv');
  content = CONTENT;

  safeShopText = computed(() =>
    this.sanitizer.bypassSecurityTrustHtml(CONTENT[this.currentLang()].shopText)
  );
}
