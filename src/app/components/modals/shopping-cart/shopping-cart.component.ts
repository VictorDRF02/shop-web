import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ProductComponent } from '../../body/product/product.component';
import { AuthService } from '../../../services/utils/auth.service';
import { User } from '../../../models/user';
import { CartItem } from '../../../models/cartItem';
import { CartItemService } from '../../../services/models/cart-item.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.scss',
  imports: [ProductComponent],
})
export class ShoppingCartComponent implements OnInit {
  totalPrice?: number;
  articles?: number;
  user?: User;

  constructor(
    private _authService: AuthService,
    private _cartService: CartItemService,
    private _cdr: ChangeDetectorRef,
    private _modal: NgbActiveModal
  ) {}

  ngOnInit(): void {
    this.getUser();
  }

  /**
   * Get or updates user.
   */
  getUser() {
    this._authService.updateUser().subscribe((res) => {
      this.user = this._authService.user;
      this.calcParams();
      this._cdr.detectChanges();
    });
  }

  /**
   * Calcs component props (total price and total articles).
   */
  calcParams() {
    if (this.user) {
      this.user.cart_items = this.user.cart_items?.sort(
        (itemA, itemB) => (itemA.id || 0) - (itemB.id || 0)
      );
    }
    const params = this.user?.cart_items?.reduce(
      (params, item) => {
        params.totalPrice += (item.Product?.price || 0) * item.quantity;
        params.articles += item.quantity;
        return params;
      },
      { totalPrice: 0, articles: 0 }
    );
    this.totalPrice = params?.totalPrice;
    this.articles = params?.articles;
  }

  /**
   * Add a value to quantity
   * @param number - Value to add.
   * @param cartItem - Item to change quantity.
   */
  addQuantity(number: number, cartItem: CartItem) {
    const auxQuantity = number + cartItem.quantity;
    if (auxQuantity > 0 && auxQuantity < 1000) {
      cartItem.quantity = auxQuantity;
      this._cartService
        .save(this._cartService.convertToFormData(cartItem))
        .subscribe((res) => {
          this.getUser();
        });
    }
  }

  /**
   * Delete the provided cartItem.
   * @param cartItem - Item to delete.
   */
  deleteItem(cartItem: CartItem) {
    this._cartService.delete(cartItem.id || 1).subscribe((res) => {
      this.getUser();
    });
  }

  /**
   * Close modal.
   */
  close() {
    this._modal.close();
  }
}
