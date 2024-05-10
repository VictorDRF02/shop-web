import { HttpHeaders, HttpInterceptorFn } from '@angular/common/http';

/**
 * Intercepts HTTP requests to add authorization headers with the token.
 * @param req - The HTTP request being intercepted
 * @param next - Is a reference to the next interceptor in the chain or the backend server.
 * @returns Passing the modified request to the next interceptor in the chain.
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Get token and the AuthService
  let token = localStorage.getItem('token')?.replaceAll('"', '');

  // Create headers
  let headers = new HttpHeaders({
    Accept: '*/*',
  });
  if (req.url.match(/login/)) {
    headers = headers.set('Content-Type', 'application/json');
  }
  // Check the token
  if (!!token) {
    headers = headers.set('Authorization', `Token ${token}`);
  }
  const request = req.clone({
    headers: headers,
  });

  return next(request);
};
