import { Component, inject } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { NgIf } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map, startWith } from 'rxjs';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ImagePreloadService } from './services/image-preload.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgIf, HeaderComponent, FooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private router = inject(Router);
  private imagePreload = inject(ImagePreloadService);

  constructor() {
    this.imagePreload.preloadAll();
  }

  currentRoute = toSignal(
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      map(e => (e as NavigationEnd).urlAfterRedirects),
      startWith(this.router.url)
    )
  );

  isFullWidth() {
    const url = this.currentRoute() ?? '';
    return url.startsWith('/projects') || url.startsWith('/rubrics') || url.startsWith('/merch');
  }

  isHome() {
    const url = this.currentRoute() ?? '';
    return url === '/' || url === '';
  }
}
