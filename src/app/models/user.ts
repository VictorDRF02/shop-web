import { CartItem } from './cartItem';
import { Model } from './model';

export interface User extends Model {
  id?: number,
  username: string;
  password: string;
  email?: string;
  is_admin?: boolean;
  cart_items?: CartItem[];
}
