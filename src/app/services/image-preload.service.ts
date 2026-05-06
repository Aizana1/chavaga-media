import { Injectable } from '@angular/core';

const IMAGES: string[] = [
  // Общие
  'assets/images/logo.svg',
  // Hero
  'assets/images/hero.webp',
  'assets/images/hero-m.webp',
  // О нас
  'assets/images/about.png',
  // Рубрики
  'assets/images/yurt.svg',
  'assets/images/rubrics-bg1.svg',
  'assets/images/rubrics1.svg',
  'assets/images/rubrics2.svg',
  'assets/images/rubrics3.svg',
  'assets/images/rubrics4.svg',
  'assets/images/rubrics5.svg',
  'assets/images/rubrics6.svg',
  // Проекты
  'assets/images/projects-bg.svg',
  'assets/images/project1.svg',
  'assets/images/project2.svg',
  'assets/images/project3.svg',
  'assets/images/project4.svg',
  // Мерч
  'assets/images/merch-bg1.svg',
  'assets/images/merch-bg2.svg',
  'assets/images/merch-bg3.svg',
  'assets/images/merch1.svg',
  'assets/images/merch2.svg',
  'assets/images/merch3.svg',
  'assets/images/merch4.svg',
  'assets/images/extra-bg1.svg',
  'assets/images/extra-bg2.svg',
  // Контакты
  'assets/images/contact.svg',
  'assets/images/gmail-logo.svg',
  'assets/images/inst-logo.svg',
  'assets/images/tg-logo.svg',
];

@Injectable({ providedIn: 'root' })
export class ImagePreloadService {
  preloadAll(): void {
    this.preloadUrls(IMAGES);
  }

  preloadUrls(urls: string[]): void {
    urls.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }
}
