import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { SessionService } from '../core/services/share/session.service';
import { ShareService } from '../core/services/share/share.service';
import { firstValueFrom } from 'rxjs';

export const authGuard: CanActivateFn = async (route, state) => {
  const shareService = inject(ShareService);
  const router = inject(Router);

  try {
    const serverFlag = await checkServer(shareService);
    const isAuthenticated = SessionService.rememberSession() && serverFlag;

    if (!isAuthenticated) {
      router.navigate(['/no-access']);
      return false;
    }

    return true;
  } catch {
    router.navigate(['/no-access']);
    return false;
  }
};

async function checkServer(shareServer: ShareService): Promise<boolean> {
  try {
    await firstValueFrom(shareServer.ComeOn());
    return true;
  } catch {
    return false;
  }
}
