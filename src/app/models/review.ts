import { Model } from './model';
import { Product } from './product';
import { User } from './user';

export interface Review extends Model {
  id?: number;
  product?: number;
  Product?: Product;
  user?: number;
  User?: User;
  rating: 1 | 2 | 3 | 4 | 5;
  comment: string;
}
