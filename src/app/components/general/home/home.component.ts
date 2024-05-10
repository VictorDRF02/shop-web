import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '../../../services/utils/auth.service';
import { User } from '../../../models/user';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
})
export class HomeComponent implements OnInit {
  user?: User;
  itemsNumber: number = 0;

  constructor(
    private _authService: AuthService,
    private _cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getUser();
  }

  /**
   * Get or update user.
   */
  getUser() {
    this._authService.updateUser().subscribe((res) => {
      this.user = this._authService.user;
      this.itemsNumber = this.getItemsNumber();
      this._cdr.detectChanges();
    })
  }

  /**
   * Calc number of cart items of the user.
   * @returns Number of cart items.
   */
  getItemsNumber(): number {
    return (
      this.user?.cart_items?.reduce((total, e) => total + e.quantity, 0) || 0
    );
  }
}
