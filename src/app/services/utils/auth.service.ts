import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, switchMap } from 'rxjs';
import { User } from '../../models/user';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private AUTH_URL = 'auth/';

  constructor(
    private _http: HttpClient,
    private _router: Router,
    private _toastrService: ToastrService
  ) {}

  /**
   * The retrieves a token from localStorage.
   * @returns The value stored in the 'token' key in the localStorage.
   */
  get token(): string | undefined {
    return localStorage.getItem('token')?.replace('"', '');
  }

  get user(): User {
    return JSON.parse(localStorage.getItem('user') || '{}')
  }

  get isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  /**
   * Login the user and set the token in localStorage
   * @param {User} user - User's login credentials with username and password.
   */
  login(user: User) {
    const body = JSON.stringify(user);
    return this._http
      .post<any>(`${environment.apiUrl}${this.AUTH_URL}token/login/`, body)
      .pipe(
        switchMap((res) => {
          if (!!res.auth_token) {
            localStorage.setItem('token', res.auth_token);
          }
          return this._http.get<any>(
            `${environment.apiUrl}${this.AUTH_URL}users/me/`
          );
        }),
        switchMap((res) => {
          return this._http.get<User>(
            `${environment.apiUrl}shop/users/${res.id}/`
          );
        })
      )
      .subscribe({
        next: (res) => {
          localStorage.setItem('user', JSON.stringify(res));
          this._router.navigate(['/']);
        },
        error: (error) => {
          this._toastrService.error('Credenciales incorrectas');
        },
      });
  }

  /**
   * Removes the token from localStorage, and navigates to the login page.
   */
  logout() {
    return this._http
      .post<any>(`${environment.apiUrl}${this.AUTH_URL}token/logout/`, {})
      .subscribe((res) => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this._router.navigate(['login']);
      });
  }

  /**
   * Update current User
   * @returns An observable of current User
   */
  updateUser(): Observable<User> {
    return this._http
      .get<any>(`${environment.apiUrl}${this.AUTH_URL}users/me/`)
      .pipe(
        switchMap((res) => {
          return this._http.get<User>(
            `${environment.apiUrl}shop/users/${res.id}/`
          );
        }),
        switchMap((res) => {
          localStorage.removeItem('user');
          localStorage.setItem('user', JSON.stringify(res));
          return of(res);
        })
      );
  }

  register(user: any) {
    // Aquí deberías hacer la llamada a tu API para registrar el usuario.
    // Si el registro es exitoso:
    const token = 'token devuelto por tu API';
  }
}
