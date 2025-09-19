// in src/app/guards/auth.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth';
import { map, take } from 'rxjs/operators';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Return an observable that resolves to true or a UrlTree
  return authService.user$.pipe(
    take(1), // Take only the first value emitted to complete the observable
    map((user) => {
      // If the user object exists, they are logged in. Allow access.
      if (user) {
        return true;
      }
      // If no user, redirect them to the home page (or a login page)
      // and block the current navigation.
      return router.createUrlTree(['/']);
    })
  );
};
