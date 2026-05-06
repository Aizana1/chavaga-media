import { Component, computed, inject, signal, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { LanguageService } from '../../services/language.service';
import { VideoItem } from '../video-gallery/video-gallery.component';

const VIDEOS: VideoItem[] = [
  {
    id: 'rubric-video-1',
    thumbnail: 'https://media.chavaga-media.com/rubrics/video/photo_2026-05-06%2016.17.48.jpeg',
    title: { rus: 'Цикл насилия', tuv: 'Цикл насилия' },
    streamUrl: 'https://media.chavaga-media.com/rubrics/video/IMG_6382.mp4',
    type: 'direct',
  },
  {
    id: 'rubric-video-2',
    thumbnail: 'https://media.chavaga-media.com/rubrics/video/photo_2026-05-06%2016.17.46.jpeg',
    title: { rus: 'Гендерлиг күчүлел пирамидазы', tuv: 'Гендерлиг күчүлел пирамидазы' },
    streamUrl: 'https://media.chavaga-media.com/rubrics/video/IMG_6431.mp4',
    type: 'direct',
  },
  {
    id: 'rubric-video-3',
    thumbnail: 'https://media.chavaga-media.com/rubrics/video/photo_2026-05-06%2020.08.36.jpeg',
    title: { rus: '100 лет истории тувинской красоты', tuv: '100 лет истории тувинской красоты' },
    streamUrl: 'https://media.chavaga-media.com/rubrics/video/IMG_6540.MP4',
    type: 'direct',
  },
  {
    id: 'rubric-video-4',
    thumbnail: 'https://media.chavaga-media.com/rubrics/video/photo_2026-05-06%2020.08.38.jpeg',
    title: { rus: 'День коляски: удобен ли Кызыл для мам', tuv: 'День коляски: удобен ли Кызыл для мам' },
    streamUrl: 'https://media.chavaga-media.com/rubrics/video/IMG_6542.MP4',
    type: 'direct',
  },
  {
    id: 'rubric-video-5',
    thumbnail: 'https://media.chavaga-media.com/rubrics/video/photo_2026-05-06%2020.08.41.jpeg',
    title: { rus: 'Не служил не мужик? Разбираем токсичную маскулинность', tuv: 'Не служил не мужик? Разбираем токсичную маскулинность' },
    streamUrl: 'https://media.chavaga-media.com/rubrics/video/IMG_6543.MP4',
    type: 'direct',
  },
  {
    id: 'rubric-video-6',
    thumbnail: 'https://media.chavaga-media.com/rubrics/video/photo_2026-05-06%2020.08.43.jpeg',
    title: { rus: 'Видео к 8 марта с разными поколениями тувинок', tuv: 'Видео к 8 марта с разными поколениями тувинок' },
    streamUrl: 'https://media.chavaga-media.com/rubrics/video/IMG_6543.MP4',
    type: 'direct',
  },
];

@Component({
  selector: 'app-rubric-video',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rubric-video.component.html',
  styleUrl: './rubric-video.component.scss',
})
export class RubricVideoComponent {
  lang = inject(LanguageService);
  private sanitizer = inject(DomSanitizer);

  currentLang = computed(() => this.lang.language() as 'rus' | 'tuv');

  title: Record<'rus' | 'tuv', string> = {
    rus: 'ВИДЕО',
    tuv: 'ВИДЕО',
  };

  videos = VIDEOS;

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
  onEsc(): void { this.closeModal(); }

  onOverlayClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('video-modal')) {
      this.closeModal();
    }
  }
}
