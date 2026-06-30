import { Injectable } from '@angular/core';
import { initializeApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { firebaseConfig } from '../../environments/firebase.config';

/**
 * Единая точка инициализации Firebase. Создаёт приложение один раз
 * и предоставляет Auth и Firestore остальным сервисам.
 */
@Injectable({ providedIn: 'root' })
export class FirebaseService {
  readonly app: FirebaseApp = initializeApp(firebaseConfig);
  readonly auth: Auth = getAuth(this.app);
  readonly db: Firestore = getFirestore(this.app);
}
