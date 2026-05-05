import { Component, computed, inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss',
})
export class ContactsComponent {
  lang = inject(LanguageService);
  sanitizer = inject(DomSanitizer);

  safeBody1 = computed(() =>
    this.sanitizer.bypassSecurityTrustHtml(this.lang.translations().contacts.body1)
  );

  safeBody2 = computed(() =>
    this.sanitizer.bypassSecurityTrustHtml(this.lang.translations().contacts.body2)
  );
}
