import { Model } from './model';
import { Product } from './product';
import { User } from './user';

export interface CartItem extends Model {
  id?: number;
  product: number;
  Product?: Product;
  user: number;
  User?: User;
  quantity: number;
}
