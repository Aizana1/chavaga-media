import { Injectable, inject } from '@angular/core';
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
} from 'firebase/firestore';
import { FirebaseService } from './firebase.service';
import { Article } from '../models/article.model';

/** Статья, дополненная служебным полем времени создания. */
type StoredArticle = Omit<Article, 'id'> & { createdAt?: number };

@Injectable({ providedIn: 'root' })
export class ArticleStoreService {
  private fb = inject(FirebaseService);
  private get col() {
    return collection(this.fb.db, 'articles');
  }

  /** Загружает все статьи из Firestore (новые — первыми). */
  async getAll(): Promise<Article[]> {
    const q = query(this.col, orderBy('createdAt', 'desc'));
    const snap = await getDocs(q);
    return snap.docs.map(d => ({
      id: d.id,
      ...(d.data() as StoredArticle),
    })) as Article[];
  }

  /** Публикует новую статью. id документа генерирует Firestore. */
  async publish(article: Omit<Article, 'id'>): Promise<string> {
    const payload: StoredArticle = { ...article, createdAt: Date.now() };
    const ref = await addDoc(this.col, payload);
    return ref.id;
  }

  /** Удаляет опубликованную статью по id документа Firestore. */
  async delete(id: string): Promise<void> {
    await deleteDoc(doc(this.fb.db, 'articles', id));
  }
}
