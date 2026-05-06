import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';

const CONTENT = {
  rus: {
    title: 'ФЕМ-КАЛЕНДАРЬ',
    downloadBtn: 'СКАЧАТЬ\nВ ФОРМАТЕ JPG',
  },
  tuv: {
    title: 'ФЕМ-КАЛЕНДАРЬ',
    downloadBtn: 'JPG ХЕВИРГЛИГ\nКИИРТИП АЛЫРЫ',
  },
};

const CALENDAR_SVG  = 'https://media.chavaga-media.com/merch/Frame%2020%201.svg';
const CALENDAR_JPG  = 'https://media.chavaga-media.com/merch/Frame%2020%201.jpg';
const PHOTO_URL     = 'https://media.chavaga-media.com/merch/%D1%8D%D1%80%D1%82%D0%BA%D0%B5%D0%BD%20%D1%83%D0%B5.svg';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
})
export class CalendarComponent {
  lang = inject(LanguageService);
  currentLang = computed(() => this.lang.language() as 'rus' | 'tuv');
  content = CONTENT;

  calendarSvg = CALENDAR_SVG;
  calendarJpg = CALENDAR_JPG;
  photoUrl    = PHOTO_URL;

  download(): void {
    window.open(this.calendarJpg, '_blank');
  }
}
