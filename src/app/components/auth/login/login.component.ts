import { Component, inject } from '@angular/core';
import { AuthService } from '../../../services/utils/auth.service';
import { User } from '../../../models/user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(
    private _authService: AuthService,
  ) {}

  /**
   * Try to log the user
   * @param user - User to log
   */
  login(user: User): void {
    this._authService.login(user);
  }
}
