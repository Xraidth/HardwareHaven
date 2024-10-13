import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { SessionService } from '../core/services/share/session.service';

export const authGuard: CanActivateFn = (route, state) => {

  const isAuthenticated = SessionService.usuario ? true : false;
  const router = inject(Router);

  if (!isAuthenticated) {
       router.navigate(['/no-access']);
      return false;
    }

    return true;
  }

