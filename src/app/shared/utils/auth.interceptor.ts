import { HttpInterceptorFn } from '@angular/common/http';
import {AuthService} from '../../core/auth/services/auth.service';
import {inject} from '@angular/core';
import {Router} from '@angular/router';
import {throwError} from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isTokenExpired()) {
    router.navigate(['/']);
    return throwError(() => new Error('Token expired'));
  }

  const request = req.clone({
    withCredentials: true
  });
  return next(request);
};
