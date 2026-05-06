import { Component, inject } from '@angular/core';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../../services/language.service';
import { ImagePreloadService } from '../../services/image-preload.service';

const CALENDAR_IMAGES = [
  'https://media.chavaga-media.com/merch/Frame%2020%201.svg',
  'https://media.chavaga-media.com/merch/Frame%2020%201.jpg',
  'https://media.chavaga-media.com/merch/%D1%8D%D1%80%D1%82%D0%BA%D0%B5%D0%BD%20%D1%83%D0%B5.svg',
  'https://media.chavaga-media.com/merch/Frame%2010%201.png',
  'https://media.chavaga-media.com/merch/Frame%2010%201.svg',
];

@Component({
  selector: 'app-merch',
  standalone: true,
  imports: [NgFor, RouterLink],
  templateUrl: './merch.component.html',
  styleUrl: './merch.component.scss',
})
export class MerchComponent {
  lang = inject(LanguageService);
  private preload = inject(ImagePreloadService);

  images = [
    'assets/images/merch1.svg',
    'assets/images/merch2.svg',
    'assets/images/merch3.svg',
    'assets/images/merch4.svg',
  ];

  constructor() {
    this.preload.preloadUrls(CALENDAR_IMAGES);
  }
}
