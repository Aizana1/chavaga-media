import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';

const CONTENT = {
  rus: {
    title: 'КАЛЕНДАРЬ ШАГАА - 2026',
    downloadBtn: 'СКАЧАТЬ\nВ ФОРМАТЕ JPG',
  },
  tuv: {
    title: 'ШАГАА - 2026\nХҮНЗЕЛГЕЗИ',
    downloadBtn: 'JPG ХЕВИРГЛИГ\nКИИРТИП АЛЫРЫ',
  },
};

const CALENDAR_SVG = 'https://media.chavaga-media.com/merch/Frame%2010%201.svg';
const CALENDAR_JPG = 'https://media.chavaga-media.com/merch/Frame%2010%201.png';

@Component({
  selector: 'app-shagaa-calendar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shagaa-calendar.component.html',
  styleUrl: './shagaa-calendar.component.scss',
})
export class ShagaaCalendarComponent {
  lang = inject(LanguageService);
  currentLang = computed(() => this.lang.language() as 'rus' | 'tuv');
  content = CONTENT;
  calendarSvg = CALENDAR_SVG;
  calendarJpg = CALENDAR_JPG;
}
