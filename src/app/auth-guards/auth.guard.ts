import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from '../core/auth/services/auth.service';
import {map} from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.loadData().pipe(
    map(connected => {
      if (connected)
        return true;

      router.navigate(['/']);
      return false;
    })
  );
};
