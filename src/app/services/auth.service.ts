import { Injectable, inject, signal } from '@angular/core';
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import { FirebaseService } from './firebase.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private fb = inject(FirebaseService);

  /** Текущий пользователь (null — не залогинен). */
  user = signal<User | null>(null);
  /** true после первого ответа Firebase о состоянии авторизации. */
  ready = signal(false);

  private readyResolve!: () => void;
  private readyPromise = new Promise<void>(res => (this.readyResolve = res));

  constructor() {
    onAuthStateChanged(this.fb.auth, user => {
      this.user.set(user);
      if (!this.ready()) {
        this.ready.set(true);
        this.readyResolve();
      }
    });
  }

  /** Дожидается первого ответа Firebase (нужно для guard). */
  waitForReady(): Promise<void> {
    return this.readyPromise;
  }

  isLoggedIn(): boolean {
    return this.user() !== null;
  }

  async login(email: string, password: string): Promise<void> {
    await signInWithEmailAndPassword(this.fb.auth, email.trim(), password);
  }

  async logout(): Promise<void> {
    await signOut(this.fb.auth);
  }
}
