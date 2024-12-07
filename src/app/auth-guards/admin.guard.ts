import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from '../core/auth/services/auth.service';
import {map} from 'rxjs';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.loadData().pipe(
    map(connected => {
      if (connected && authService.getRole() === 'Admin')
        return true;

      router.navigate(['/']);
      return false;
    })
  );
};
