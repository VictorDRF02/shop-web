import { Injectable } from '@angular/core';
import { CartItem } from '../../models/cartItem';
import { ModelService } from './model.service';

@Injectable({
  providedIn: 'root',
})
export class CartItemService extends ModelService<CartItem> {
  constructor() {
    super();
    this.url = 'shop/cartItems';
  }
}
