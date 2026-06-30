import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

/** Пускает в /admin только залогиненного пользователя, иначе — на /admin/login. */
export const adminGuard: CanActivateFn = async () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  await auth.waitForReady();
  return auth.isLoggedIn() ? true : router.createUrlTree(['/admin/login']);
};
