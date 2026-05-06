import { Component, computed, inject, signal, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { LanguageService } from '../../services/language.service';

export interface VideoItem {
  id: string;
  thumbnail?: string;
  title: { rus: string; tuv: string };
  streamUrl: string;
  type: 'stream' | 'direct'; 
}

export const VIDEOS: VideoItem[] = [
  {
    id: 'video-1',
    thumbnail: 'https://media.chavaga-media.com/videoproject/previews/photo_2026-05-06%2015.41.53.jpeg',
    title: { rus: 'О чём мечтают тувинки: Лера', tuv: 'Тыва кыстар чүнү күзеп турарыл: Лера' },
    streamUrl: 'https://media.chavaga-media.com/videoproject/IMG_6517.MP4',
    type: 'direct',
  },
  {
    id: 'video-2',
    thumbnail: 'https://media.chavaga-media.com/videoproject/previews/photo_2026-05-06%2015.41.54.jpeg',
    title: { rus: 'О чём мечтают тувинки: Анастасия', tuv: 'Тыва кыстар чүнү күзеп турарыл: Анастасия' },
    streamUrl: 'https://media.chavaga-media.com/videoproject/IMG_6518.MP4',
    type: 'direct',
  },
  {
    id: 'video-3',
    thumbnail: 'https://media.chavaga-media.com/videoproject/previews/photo_2026-05-06%2015.44.39.jpeg',
    title: { rus: 'О чём мечтают тувинки: Алёна', tuv: 'Тыва кыстар чүнү күзеп турарыл: Алёна' },
    streamUrl: 'https://media.chavaga-media.com/videoproject/IMG_6519.MP4',
    type: 'direct',
  },
  {
    id: 'video-4',
    thumbnail: 'https://media.chavaga-media.com/videoproject/previews/photo_2026-05-06%2015.46.47.jpeg',
    title: { rus: 'О чём мечтают тувинки: Чейнеш', tuv: 'Тыва кыстар чүнү күзеп турарыл: Чейнеш' },
    streamUrl: 'https://media.chavaga-media.com/videoproject/IMG_6520.MP4',
    type: 'direct',
  },
  {
    id: 'video-5',
    thumbnail: 'https://media.chavaga-media.com/videoproject/previews/photo_2026-05-06%2015.48.53.jpeg',
    title: { rus: 'О чём мечтают тувинки: Руслана', tuv: 'Тыва кыстар чүнү күзеп турарыл: Руслана' },
    streamUrl: 'https://media.chavaga-media.com/videoproject/IMG_6521.MP4',
    type: 'direct',
  },
  {
    id: 'video-6',
    thumbnail: 'https://media.chavaga-media.com/videoproject/previews/photo_2026-05-06%2015.48.55.jpeg',
    title: { rus: 'О чём мечтают тувинки: Ада', tuv: 'Тыва кыстар чүнү күзеп турарыл: Ада' },
    streamUrl: 'https://media.chavaga-media.com/videoproject/IMG_6522.MP4',
    type: 'direct',
  },
  {
    id: 'video-7',
    thumbnail: 'https://media.chavaga-media.com/videoproject/previews/photo_2026-05-06%2015.52.31.jpeg',
    title: { rus: 'О чём мечтают тувинки: Аэлита', tuv: 'Тыва кыстар чүнү күзеп турарыл: Аэлита' },
    streamUrl: 'https://media.chavaga-media.com/videoproject/IMG_6523.MP4',
    type: 'direct',
  },
  {
    id: 'video-8',
    thumbnail: 'https://media.chavaga-media.com/videoproject/previews/photo_2026-05-06%2015.52.33.jpeg',
    title: { rus: 'О чём мечтают тувинки: Чечек', tuv: 'Тыва кыстар чүнү күзеп турарыл: Чечек' },
    streamUrl: 'https://media.chavaga-media.com/videoproject/IMG_6524.MP4',
    type: 'direct',
  },
  {
    id: 'video-9',
    thumbnail: 'https://media.chavaga-media.com/videoproject/previews/photo_2026-05-06%2015.54.29.jpeg',
    title: { rus: 'О чём мечтают тувинки: Ольга', tuv: 'Тыва кыстар чүнү күзеп турарыл: Ольга' },
    streamUrl: 'https://media.chavaga-media.com/videoproject/IMG_6525.MP4',
    type: 'direct',
  },
  {
    id: 'video-10',
    thumbnail: 'https://media.chavaga-media.com/videoproject/previews/photo_2026-05-06%2015.54.31.jpeg',
    title: { rus: 'О чём мечтают тувинки: Татьяна', tuv: 'Тыва кыстар чүнү күзеп турарыл: Татьяна' },
    streamUrl: 'https://media.chavaga-media.com/videoproject/IMG_6526.MP4',
    type: 'direct',
  },
  {
    id: 'video-11',
    thumbnail: 'https://media.chavaga-media.com/videoproject/previews/photo_2026-05-06%2015.55.57.jpeg',
    title: { rus: 'О чём мечтают тувинки: Яна', tuv: 'Тыва кыстар чүнү күзеп турарыл: Яна' },
    streamUrl: 'https://media.chavaga-media.com/videoproject/IMG_6527.MP4',
    type: 'direct',
  },
  {
    id: 'video-12',
    thumbnail: 'https://media.chavaga-media.com/videoproject/previews/photo_2026-05-06%2015.56.00.jpeg',
    title: { rus: 'О чём мечтают тувинки: Сюзанна', tuv: 'Тыва кыстар чүнү күзеп турарыл: Сюзанна' },
    streamUrl: 'https://media.chavaga-media.com/videoproject/IMG_6528.MP4',
    type: 'direct',
  },
];

@Component({
  selector: 'app-video-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './video-gallery.component.html',
  styleUrl: './video-gallery.component.scss',
})
export class VideoGalleryComponent {
  lang    = inject(LanguageService);
  private sanitizer = inject(DomSanitizer);

  currentLang = computed(() => this.lang.language() as 'rus' | 'tuv');

  title: Record<'rus' | 'tuv', string> = {
    rus: '«О ЧЁМ МЕЧТАЮТ ТУВИНКИ?»',
    tuv: '«ТЫВА КЫСТАР ЧҮНҮ КҮЗЕП ТУРАРЫЛ?»',
  };

  videos = VIDEOS;

  // Модальное окно
  activeVideo = signal<VideoItem | null>(null);

  safeUrl = computed((): SafeResourceUrl | null => {
    const v = this.activeVideo();
    if (!v) return null;
    return this.sanitizer.bypassSecurityTrustResourceUrl(v.streamUrl);
  });

  openModal(video: VideoItem): void {
    this.activeVideo.set(video);
    document.body.style.overflow = 'hidden';
  }

  closeModal(): void {
    this.activeVideo.set(null);
    document.body.style.overflow = '';
  }

  @HostListener('document:keydown.escape')
  onEsc(): void {
    this.closeModal();
  }

  onOverlayClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('video-modal')) {
      this.closeModal();
    }
  }
}
