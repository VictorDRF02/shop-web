import { Component } from '@angular/core';
import { User } from '../../../models/user';
import { UserService } from '../../../services/models/user.service';
import { AuthService } from '../../../services/utils/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {

  constructor(private _userService: UserService, private _authService: AuthService, private _toastrService: ToastrService) {}

  /**
   * Register User and login.
   * @param user - User to register.
   */
  register(user: User) {
    this._userService.save(this._userService.convertToFormData(user)).subscribe({
      next: () => {
        return this._authService.login(user)
      },
      error: (error) => {
        for (const e in error.error) {
          this._toastrService.error(error.error[e][0], e)
        }
      }
    });
  }
}
