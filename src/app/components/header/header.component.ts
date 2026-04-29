import { Component, computed, inject } from '@angular/core';
import { NgFor } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LanguageService } from '../../services/language.service';
import { Language } from '../../models/translations';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgFor, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  lang = inject(LanguageService);
  menuOpen = false;
  readonly navItems = computed(() => {
    const t = this.lang.translations().nav;
    return [
      { label: t.about, route: '/about' },
      { label: t.rubrics, route: '/rubrics' },
      { label: t.projects, route: '/projects' },
      { label: t.merch, route: '/merch' },
      { label: t.contacts, route: '/contacts' },
    ];
  });

  setLang(l: Language) {
    this.lang.setLanguage(l);
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
}
