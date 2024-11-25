import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from '../core/auth/services/auth.service';
import {catchError, map, of} from 'rxjs';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.loadData().pipe(
    map(data => data.role === 'Admin' || (router.navigate(['/']), false)),
    catchError(_ => {
      router.navigate(['/']);
      return of(false);
    })
  );
};
