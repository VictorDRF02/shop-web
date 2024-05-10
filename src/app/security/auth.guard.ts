import { AuthService } from '../services/utils/auth.service';
import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';

/**
 * Checks if the user is authenticated.
 * @returns If the user is authenticated  returns `true`. If the user is not , it navigates to the login page using the router and then returns `false`.
 */
export const authGuard: CanActivateChildFn = async (route, state) => {
  const authService: AuthService = inject(AuthService);
  if (authService.isAuthenticated) {
    return true;
  } else {
    const router: Router = inject(Router);
    router.navigate(['login']);
    return false;
  }
};
