import { Component, signal, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-photo-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './photo-gallery.component.html',
  styleUrl: './photo-gallery.component.scss',
})
export class PhotoGalleryComponent {
  photos: string[] = [
    'https://media.chavaga-media.com/%D0%A2%D0%B5%D0%BB%D0%BE%20%D0%B8%20%D1%82%D0%B5%D0%BB%D0%B5%D1%81%D0%BD%D0%BE%D1%81%D1%82%D1%8C%20%D1%84%D0%BE%D1%82%D0%BA%D0%B8/7L6A2288_resized.jpg',
    'https://media.chavaga-media.com/%D0%A2%D0%B5%D0%BB%D0%BE%20%D0%B8%20%D1%82%D0%B5%D0%BB%D0%B5%D1%81%D0%BD%D0%BE%D1%81%D1%82%D1%8C%20%D1%84%D0%BE%D1%82%D0%BA%D0%B8/7L6A2293_resized.jpg',
    'https://media.chavaga-media.com/%D0%A2%D0%B5%D0%BB%D0%BE%20%D0%B8%20%D1%82%D0%B5%D0%BB%D0%B5%D1%81%D0%BD%D0%BE%D1%81%D1%82%D1%8C%20%D1%84%D0%BE%D1%82%D0%BA%D0%B8/7L6A2307.jpg',
    'https://media.chavaga-media.com/%D0%A2%D0%B5%D0%BB%D0%BE%20%D0%B8%20%D1%82%D0%B5%D0%BB%D0%B5%D1%81%D0%BD%D0%BE%D1%81%D1%82%D1%8C%20%D1%84%D0%BE%D1%82%D0%BA%D0%B8/7L6A2331_resized.jpg',
    'https://media.chavaga-media.com/%D0%A2%D0%B5%D0%BB%D0%BE%20%D0%B8%20%D1%82%D0%B5%D0%BB%D0%B5%D1%81%D0%BD%D0%BE%D1%81%D1%82%D1%8C%20%D1%84%D0%BE%D1%82%D0%BA%D0%B8/7L6A2333.jpg',
    'https://media.chavaga-media.com/%D0%A2%D0%B5%D0%BB%D0%BE%20%D0%B8%20%D1%82%D0%B5%D0%BB%D0%B5%D1%81%D0%BD%D0%BE%D1%81%D1%82%D1%8C%20%D1%84%D0%BE%D1%82%D0%BA%D0%B8/7L6A2333_resized.jpg',
    'https://media.chavaga-media.com/%D0%A2%D0%B5%D0%BB%D0%BE%20%D0%B8%20%D1%82%D0%B5%D0%BB%D0%B5%D1%81%D0%BD%D0%BE%D1%81%D1%82%D1%8C%20%D1%84%D0%BE%D1%82%D0%BA%D0%B8/7L6A2351.jpg',
    'https://media.chavaga-media.com/%D0%A2%D0%B5%D0%BB%D0%BE%20%D0%B8%20%D1%82%D0%B5%D0%BB%D0%B5%D1%81%D0%BD%D0%BE%D1%81%D1%82%D1%8C%20%D1%84%D0%BE%D1%82%D0%BA%D0%B8/7L6A2351_resized.jpg',
    'https://media.chavaga-media.com/%D0%A2%D0%B5%D0%BB%D0%BE%20%D0%B8%20%D1%82%D0%B5%D0%BB%D0%B5%D1%81%D0%BD%D0%BE%D1%81%D1%82%D1%8C%20%D1%84%D0%BE%D1%82%D0%BA%D0%B8/7L6A2356.jpg',
    'https://media.chavaga-media.com/%D0%A2%D0%B5%D0%BB%D0%BE%20%D0%B8%20%D1%82%D0%B5%D0%BB%D0%B5%D1%81%D0%BD%D0%BE%D1%81%D1%82%D1%8C%20%D1%84%D0%BE%D1%82%D0%BA%D0%B8/7L6A2371_resized.jpg',
    'https://media.chavaga-media.com/%D0%A2%D0%B5%D0%BB%D0%BE%20%D0%B8%20%D1%82%D0%B5%D0%BB%D0%B5%D1%81%D0%BD%D0%BE%D1%81%D1%82%D1%8C%20%D1%84%D0%BE%D1%82%D0%BA%D0%B8/7L6A2373_resized.jpg',
    'https://media.chavaga-media.com/%D0%A2%D0%B5%D0%BB%D0%BE%20%D0%B8%20%D1%82%D0%B5%D0%BB%D0%B5%D1%81%D0%BD%D0%BE%D1%81%D1%82%D1%8C%20%D1%84%D0%BE%D1%82%D0%BA%D0%B8/7L6A2383_resized.jpg',
    'https://media.chavaga-media.com/%D0%A2%D0%B5%D0%BB%D0%BE%20%D0%B8%20%D1%82%D0%B5%D0%BB%D0%B5%D1%81%D0%BD%D0%BE%D1%81%D1%82%D1%8C%20%D1%84%D0%BE%D1%82%D0%BA%D0%B8/7L6A2387_resized.jpg',
    'https://media.chavaga-media.com/%D0%A2%D0%B5%D0%BB%D0%BE%20%D0%B8%20%D1%82%D0%B5%D0%BB%D0%B5%D1%81%D0%BD%D0%BE%D1%81%D1%82%D1%8C%20%D1%84%D0%BE%D1%82%D0%BA%D0%B8/7L6A2392_resized.jpg',
    'https://media.chavaga-media.com/%D0%A2%D0%B5%D0%BB%D0%BE%20%D0%B8%20%D1%82%D0%B5%D0%BB%D0%B5%D1%81%D0%BD%D0%BE%D1%81%D1%82%D1%8C%20%D1%84%D0%BE%D1%82%D0%BA%D0%B8/7L6A2396_resized.jpg',
    'https://media.chavaga-media.com/%D0%A2%D0%B5%D0%BB%D0%BE%20%D0%B8%20%D1%82%D0%B5%D0%BB%D0%B5%D1%81%D0%BD%D0%BE%D1%81%D1%82%D1%8C%20%D1%84%D0%BE%D1%82%D0%BA%D0%B8/7L6A2405_resized.jpg',
    'https://media.chavaga-media.com/%D0%A2%D0%B5%D0%BB%D0%BE%20%D0%B8%20%D1%82%D0%B5%D0%BB%D0%B5%D1%81%D0%BD%D0%BE%D1%81%D1%82%D1%8C%20%D1%84%D0%BE%D1%82%D0%BA%D0%B8/7L6A2411_resized.jpg',
    'https://media.chavaga-media.com/%D0%A2%D0%B5%D0%BB%D0%BE%20%D0%B8%20%D1%82%D0%B5%D0%BB%D0%B5%D1%81%D0%BD%D0%BE%D1%81%D1%82%D1%8C%20%D1%84%D0%BE%D1%82%D0%BA%D0%B8/7L6A2412_resized.jpg',
    'https://media.chavaga-media.com/%D0%A2%D0%B5%D0%BB%D0%BE%20%D0%B8%20%D1%82%D0%B5%D0%BB%D0%B5%D1%81%D0%BD%D0%BE%D1%81%D1%82%D1%8C%20%D1%84%D0%BE%D1%82%D0%BA%D0%B8/7L6A2415_resized.jpg',
    'https://media.chavaga-media.com/%D0%A2%D0%B5%D0%BB%D0%BE%20%D0%B8%20%D1%82%D0%B5%D0%BB%D0%B5%D1%81%D0%BD%D0%BE%D1%81%D1%82%D1%8C%20%D1%84%D0%BE%D1%82%D0%BA%D0%B8/7L6A2420_resized.jpg',
    'https://media.chavaga-media.com/%D0%A2%D0%B5%D0%BB%D0%BE%20%D0%B8%20%D1%82%D0%B5%D0%BB%D0%B5%D1%81%D0%BD%D0%BE%D1%81%D1%82%D1%8C%20%D1%84%D0%BE%D1%82%D0%BA%D0%B8/7L6A2424_resized.jpg',
    'https://media.chavaga-media.com/%D0%A2%D0%B5%D0%BB%D0%BE%20%D0%B8%20%D1%82%D0%B5%D0%BB%D0%B5%D1%81%D0%BD%D0%BE%D1%81%D1%82%D1%8C%20%D1%84%D0%BE%D1%82%D0%BA%D0%B8/7L6A2427_resized.jpg',
    'https://media.chavaga-media.com/%D0%A2%D0%B5%D0%BB%D0%BE%20%D0%B8%20%D1%82%D0%B5%D0%BB%D0%B5%D1%81%D0%BD%D0%BE%D1%81%D1%82%D1%8C%20%D1%84%D0%BE%D1%82%D0%BA%D0%B8/7L6A2430_resized.jpg',
    'https://media.chavaga-media.com/%D0%A2%D0%B5%D0%BB%D0%BE%20%D0%B8%20%D1%82%D0%B5%D0%BB%D0%B5%D1%81%D0%BD%D0%BE%D1%81%D1%82%D1%8C%20%D1%84%D0%BE%D1%82%D0%BA%D0%B8/7L6A2439_resized.jpg',
    'https://media.chavaga-media.com/%D0%A2%D0%B5%D0%BB%D0%BE%20%D0%B8%20%D1%82%D0%B5%D0%BB%D0%B5%D1%81%D0%BD%D0%BE%D1%81%D1%82%D1%8C%20%D1%84%D0%BE%D1%82%D0%BA%D0%B8/7L6A2458_resized.jpg',
    'https://media.chavaga-media.com/%D0%A2%D0%B5%D0%BB%D0%BE%20%D0%B8%20%D1%82%D0%B5%D0%BB%D0%B5%D1%81%D0%BD%D0%BE%D1%81%D1%82%D1%8C%20%D1%84%D0%BE%D1%82%D0%BA%D0%B8/7L6A2477_resized.jpg',
    'https://media.chavaga-media.com/%D0%A2%D0%B5%D0%BB%D0%BE%20%D0%B8%20%D1%82%D0%B5%D0%BB%D0%B5%D1%81%D0%BD%D0%BE%D1%81%D1%82%D1%8C%20%D1%84%D0%BE%D1%82%D0%BA%D0%B8/7L6A2514_resized.jpg',
    'https://media.chavaga-media.com/%D0%A2%D0%B5%D0%BB%D0%BE%20%D0%B8%20%D1%82%D0%B5%D0%BB%D0%B5%D1%81%D0%BD%D0%BE%D1%81%D1%82%D1%8C%20%D1%84%D0%BE%D1%82%D0%BA%D0%B8/7L6A2522_resized.jpg',
    'https://media.chavaga-media.com/%D0%A2%D0%B5%D0%BB%D0%BE%20%D0%B8%20%D1%82%D0%B5%D0%BB%D0%B5%D1%81%D0%BD%D0%BE%D1%81%D1%82%D1%8C%20%D1%84%D0%BE%D1%82%D0%BA%D0%B8/7L6A2534_resized.jpg',
    'https://media.chavaga-media.com/%D0%A2%D0%B5%D0%BB%D0%BE%20%D0%B8%20%D1%82%D0%B5%D0%BB%D0%B5%D1%81%D0%BD%D0%BE%D1%81%D1%82%D1%8C%20%D1%84%D0%BE%D1%82%D0%BA%D0%B8/7L6A2539_resized.jpg',
    'https://media.chavaga-media.com/%D0%A2%D0%B5%D0%BB%D0%BE%20%D0%B8%20%D1%82%D0%B5%D0%BB%D0%B5%D1%81%D0%BD%D0%BE%D1%81%D1%82%D1%8C%20%D1%84%D0%BE%D1%82%D0%BA%D0%B8/7L6A2545_resized.jpg',
    'https://media.chavaga-media.com/%D0%A2%D0%B5%D0%BB%D0%BE%20%D0%B8%20%D1%82%D0%B5%D0%BB%D0%B5%D1%81%D0%BD%D0%BE%D1%81%D1%82%D1%8C%20%D1%84%D0%BE%D1%82%D0%BA%D0%B8/7L6A2552_resized.jpg',
    'https://media.chavaga-media.com/%D0%A2%D0%B5%D0%BB%D0%BE%20%D0%B8%20%D1%82%D0%B5%D0%BB%D0%B5%D1%81%D0%BD%D0%BE%D1%81%D1%82%D1%8C%20%D1%84%D0%BE%D1%82%D0%BA%D0%B8/7L6A2563_resized.jpg',
    'https://media.chavaga-media.com/%D0%A2%D0%B5%D0%BB%D0%BE%20%D0%B8%20%D1%82%D0%B5%D0%BB%D0%B5%D1%81%D0%BD%D0%BE%D1%81%D1%82%D1%8C%20%D1%84%D0%BE%D1%82%D0%BA%D0%B8/7L6A2564_resized.jpg',
    'https://media.chavaga-media.com/%D0%A2%D0%B5%D0%BB%D0%BE%20%D0%B8%20%D1%82%D0%B5%D0%BB%D0%B5%D1%81%D0%BD%D0%BE%D1%81%D1%82%D1%8C%20%D1%84%D0%BE%D1%82%D0%BA%D0%B8/7L6A2565_resized.jpg',
    'https://media.chavaga-media.com/%D0%A2%D0%B5%D0%BB%D0%BE%20%D0%B8%20%D1%82%D0%B5%D0%BB%D0%B5%D1%81%D0%BD%D0%BE%D1%81%D1%82%D1%8C%20%D1%84%D0%BE%D1%82%D0%BA%D0%B8/7L6A2610_resized.jpg',
    'https://media.chavaga-media.com/%D0%A2%D0%B5%D0%BB%D0%BE%20%D0%B8%20%D1%82%D0%B5%D0%BB%D0%B5%D1%81%D0%BD%D0%BE%D1%81%D1%82%D1%8C%20%D1%84%D0%BE%D1%82%D0%BA%D0%B8/7L6A2619_resized.jpg',
    'https://media.chavaga-media.com/%D0%A2%D0%B5%D0%BB%D0%BE%20%D0%B8%20%D1%82%D0%B5%D0%BB%D0%B5%D1%81%D0%BD%D0%BE%D1%81%D1%82%D1%8C%20%D1%84%D0%BE%D1%82%D0%BA%D0%B8/7L6A2625_resized.jpg',
    'https://media.chavaga-media.com/%D0%A2%D0%B5%D0%BB%D0%BE%20%D0%B8%20%D1%82%D0%B5%D0%BB%D0%B5%D1%81%D0%BD%D0%BE%D1%81%D1%82%D1%8C%20%D1%84%D0%BE%D1%82%D0%BA%D0%B8/7L6A2653_resized.jpg',
    'https://media.chavaga-media.com/%D0%A2%D0%B5%D0%BB%D0%BE%20%D0%B8%20%D1%82%D0%B5%D0%BB%D0%B5%D1%81%D0%BD%D0%BE%D1%81%D1%82%D1%8C%20%D1%84%D0%BE%D1%82%D0%BA%D0%B8/7L6A2667_resized.jpg',
    'https://media.chavaga-media.com/%D0%A2%D0%B5%D0%BB%D0%BE%20%D0%B8%20%D1%82%D0%B5%D0%BB%D0%B5%D1%81%D0%BD%D0%BE%D1%81%D1%82%D1%8C%20%D1%84%D0%BE%D1%82%D0%BA%D0%B8/7L6A2673_resized.jpg',
    'https://media.chavaga-media.com/%D0%A2%D0%B5%D0%BB%D0%BE%20%D0%B8%20%D1%82%D0%B5%D0%BB%D0%B5%D1%81%D0%BD%D0%BE%D1%81%D1%82%D1%8C%20%D1%84%D0%BE%D1%82%D0%BA%D0%B8/7L6A2699_resized.jpg',
    'https://media.chavaga-media.com/%D0%A2%D0%B5%D0%BB%D0%BE%20%D0%B8%20%D1%82%D0%B5%D0%BB%D0%B5%D1%81%D0%BD%D0%BE%D1%81%D1%82%D1%8C%20%D1%84%D0%BE%D1%82%D0%BA%D0%B8/7L6A2708_resized.jpg',
    'https://media.chavaga-media.com/%D0%A2%D0%B5%D0%BB%D0%BE%20%D0%B8%20%D1%82%D0%B5%D0%BB%D0%B5%D1%81%D0%BD%D0%BE%D1%81%D1%82%D1%8C%20%D1%84%D0%BE%D1%82%D0%BA%D0%B8/7L6A2714_resized.jpg',
    'https://media.chavaga-media.com/%D0%A2%D0%B5%D0%BB%D0%BE%20%D0%B8%20%D1%82%D0%B5%D0%BB%D0%B5%D1%81%D0%BD%D0%BE%D1%81%D1%82%D1%8C%20%D1%84%D0%BE%D1%82%D0%BA%D0%B8/7L6A2734_resized.jpg',
    'https://media.chavaga-media.com/%D0%A2%D0%B5%D0%BB%D0%BE%20%D0%B8%20%D1%82%D0%B5%D0%BB%D0%B5%D1%81%D0%BD%D0%BE%D1%81%D1%82%D1%8C%20%D1%84%D0%BE%D1%82%D0%BA%D0%B8/7L6A2738_resized.jpg',
    'https://media.chavaga-media.com/%D0%A2%D0%B5%D0%BB%D0%BE%20%D0%B8%20%D1%82%D0%B5%D0%BB%D0%B5%D1%81%D0%BD%D0%BE%D1%81%D1%82%D1%8C%20%D1%84%D0%BE%D1%82%D0%BA%D0%B8/7L6A2751_resized.jpg',
    'https://media.chavaga-media.com/%D0%A2%D0%B5%D0%BB%D0%BE%20%D0%B8%20%D1%82%D0%B5%D0%BB%D0%B5%D1%81%D0%BD%D0%BE%D1%81%D1%82%D1%8C%20%D1%84%D0%BE%D1%82%D0%BA%D0%B8/7L6A2766_resized.jpg',
    'https://media.chavaga-media.com/%D0%A2%D0%B5%D0%BB%D0%BE%20%D0%B8%20%D1%82%D0%B5%D0%BB%D0%B5%D1%81%D0%BD%D0%BE%D1%81%D1%82%D1%8C%20%D1%84%D0%BE%D1%82%D0%BA%D0%B8/7L6A2771_resized.jpg',
    'https://media.chavaga-media.com/%D0%A2%D0%B5%D0%BB%D0%BE%20%D0%B8%20%D1%82%D0%B5%D0%BB%D0%B5%D1%81%D0%BD%D0%BE%D1%81%D1%82%D1%8C%20%D1%84%D0%BE%D1%82%D0%BA%D0%B8/7L6A2805_resized.jpg',
    'https://media.chavaga-media.com/%D0%A2%D0%B5%D0%BB%D0%BE%20%D0%B8%20%D1%82%D0%B5%D0%BB%D0%B5%D1%81%D0%BD%D0%BE%D1%81%D1%82%D1%8C%20%D1%84%D0%BE%D1%82%D0%BA%D0%B8/7L6A2815_resized.jpg',
    'https://media.chavaga-media.com/%D0%A2%D0%B5%D0%BB%D0%BE%20%D0%B8%20%D1%82%D0%B5%D0%BB%D0%B5%D1%81%D0%BD%D0%BE%D1%81%D1%82%D1%8C%20%D1%84%D0%BE%D1%82%D0%BA%D0%B8/7L6A2870_resized.jpg',
    'https://media.chavaga-media.com/%D0%A2%D0%B5%D0%BB%D0%BE%20%D0%B8%20%D1%82%D0%B5%D0%BB%D0%B5%D1%81%D0%BD%D0%BE%D1%81%D1%82%D1%8C%20%D1%84%D0%BE%D1%82%D0%BA%D0%B8/7L6A2891_resized.jpg',
    'https://media.chavaga-media.com/%D0%A2%D0%B5%D0%BB%D0%BE%20%D0%B8%20%D1%82%D0%B5%D0%BB%D0%B5%D1%81%D0%BD%D0%BE%D1%81%D1%82%D1%8C%20%D1%84%D0%BE%D1%82%D0%BA%D0%B8/7L6A2899_resized.jpg',
    'https://media.chavaga-media.com/%D0%A2%D0%B5%D0%BB%D0%BE%20%D0%B8%20%D1%82%D0%B5%D0%BB%D0%B5%D1%81%D0%BD%D0%BE%D1%81%D1%82%D1%8C%20%D1%84%D0%BE%D1%82%D0%BA%D0%B8/7L6A2974_resized.jpg',
  ];

  activeIndex = signal<number | null>(null);

  open(index: number) {
    this.activeIndex.set(index);
  }

  close() {
    this.activeIndex.set(null);
  }

  prev() {
    const i = this.activeIndex();
    if (i !== null && i > 0) this.activeIndex.set(i - 1);
  }

  next() {
    const i = this.activeIndex();
    if (i !== null && i < this.photos.length - 1) this.activeIndex.set(i + 1);
  }

  @HostListener('document:keydown', ['$event'])
  onKey(e: KeyboardEvent) {
    if (this.activeIndex() === null) return;
    if (e.key === 'Escape') this.close();
    if (e.key === 'ArrowLeft') this.prev();
    if (e.key === 'ArrowRight') this.next();
  }
}
