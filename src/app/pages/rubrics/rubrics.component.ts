import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LanguageService } from '../../services/language.service';
import { RUBRIC_SLUGS } from '../../data/rubrics.data';

@Component({
  selector: 'app-rubrics',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './rubrics.component.html',
  styleUrl: './rubrics.component.scss',
})
export class RubricsComponent {
  lang = inject(LanguageService);

  slugs = RUBRIC_SLUGS;

  icons = [
    'assets/images/rubrics1.svg',
    'assets/images/rubrics2.svg',
    'assets/images/rubrics3.svg',
    'assets/images/rubrics4.svg',
    'assets/images/rubrics5.svg',
    'assets/images/rubrics6.svg',
  ];
}
