import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { map, take, Observable } from 'rxjs';

import { AuthService } from '../services/auth';

/**
 * A functional route guard that protects routes from unauthenticated access.
 * It checks the user's login status via the AuthService before allowing
 * navigation to a protected route to complete.
 *
 * @param route - The route that is being activated.
 * @param state - The state of the router at the time of activation.
 * @returns An Observable that emits a boolean or a UrlTree.
 *          - `true`: Allows the navigation to proceed.
 *          - `UrlTree`: Cancels the current navigation and redirects the user.
 */
export const authGuard: CanActivateFn = (route, state) => {
  // Use Angular's `inject` function to get instances of required services.
  // This is the standard pattern for dependency injection in functional guards.
  const authService = inject(AuthService);
  const router = inject(Router);

  // The guard must return an Observable, a Promise, or a boolean.
  // Here, we return an Observable derived from the AuthService's user$ stream.
  return authService.user$.pipe(
    /**
     * `take(1)` is crucial for route guards. It takes only the first value
     * emitted by the user$ observable and then automatically completes the stream.
     * The Angular Router requires the guard's observable to complete for the
     * navigation to be resolved.
     */
    take(1),

    /**
     * `map` transforms the emitted value (a User object or null) into the
     * boolean or UrlTree that the Angular Router understands.
     */
    map((user) => {
      // Check if the user object is truthy (i.e., not null or undefined).
      const isLoggedIn = !!user;

      if (isLoggedIn) {
        // If the user is logged in, allow navigation to the requested route.
        return true;
      } else {
        // If the user is not logged in, cancel the current navigation
        // and redirect them to the home page. `createUrlTree` is the safe
        // and correct way to trigger a programmatic redirect from a guard.
        return router.createUrlTree(['/']);
      }
    })
  );
};