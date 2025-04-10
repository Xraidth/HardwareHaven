import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { SessionService } from '../core/services/share/session.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const user = SessionService.rememberSession();
  const isAdmin = user?.tipoUsuario === 'Administrador';

  if (!isAdmin) {
    router.navigate(['/no-access']);
    return false;
  }

  return true;
};
