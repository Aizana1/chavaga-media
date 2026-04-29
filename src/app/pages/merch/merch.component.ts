import { Component, inject } from '@angular/core';
import { NgFor } from '@angular/common';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-merch',
  standalone: true,
  imports: [NgFor],
  templateUrl: './merch.component.html',
  styleUrl: './merch.component.scss',
})
export class MerchComponent {
  lang = inject(LanguageService);

  images = [
    'assets/images/merch1.svg',
    'assets/images/merch2.svg',
    'assets/images/merch3.svg',
    'assets/images/merch4.svg',
  ];
}
