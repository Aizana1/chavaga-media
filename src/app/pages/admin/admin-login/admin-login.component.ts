import { Component, inject, signal } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.scss',
})
export class AdminLoginComponent {
  private auth = inject(AuthService);
  private router = inject(Router);

  email = signal('');
  password = signal('');
  error = signal('');
  loading = signal(false);

  async submit() {
    if (this.loading()) return;
    this.error.set('');
    this.loading.set(true);
    try {
      await this.auth.login(this.email(), this.password());
      this.router.navigate(['/admin']);
    } catch (e: any) {
      this.error.set(this.humanizeError(e?.code));
    } finally {
      this.loading.set(false);
    }
  }

  private humanizeError(code?: string): string {
    switch (code) {
      case 'auth/invalid-email':
        return 'Неверный формат почты';
      case 'auth/invalid-credential':
      case 'auth/wrong-password':
      case 'auth/user-not-found':
        return 'Неверная почта или пароль';
      case 'auth/too-many-requests':
        return 'Слишком много попыток. Попробуйте позже';
      default:
        return 'Не удалось войти. Проверьте данные и подключение';
    }
  }
}
