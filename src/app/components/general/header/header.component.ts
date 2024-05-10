import { Component, EventEmitter, Input, Output, model } from '@angular/core';
import { AuthService } from '../../../services/utils/auth.service';
import { ModalService } from '../../../services/utils/modal.service';
import { ShoppingCartComponent } from '../../modals/shopping-cart/shopping-cart.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  @Input() cartNumber: number = 0;
  @Output() updateEmitter = new EventEmitter<any>();

  // Links
  homeLink: string = '/shop/categories/1';
  cartLink: string = '/shop/cart/';
  aboutLink: string = '/shop/about';
  contatLink: string = '/shop/contact';

  constructor(
    private _authService: AuthService,
    private _modalService: ModalService
  ) {}

  openCartModal() {
    const modal = this._modalService.openModal(ShoppingCartComponent, null, {
      centered: true,
      size: 'xl',
    });
    modal.closed.subscribe(
      (res) => {
        this.updateEmitter.emit()
      }
    );
  }

  /**
   * Logout User.
   */
  logout() {
    this._authService.logout();
  }
}
