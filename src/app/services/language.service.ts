import { Injectable, signal, computed } from '@angular/core';
import { Language, TRANSLATIONS, Translations } from '../models/translations';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private _language = signal<Language>('rus');

  language = this._language.asReadonly();

  translations = computed<Translations>(() => TRANSLATIONS[this._language()]);

  setLanguage(lang: Language): void {
    this._language.set(lang);
  }
}
