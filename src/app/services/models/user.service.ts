import { Injectable } from '@angular/core';
import { User } from '../../models/user';
import { ModelService } from './model.service';

@Injectable({
  providedIn: 'root',
})
export class UserService extends ModelService<User> {
  constructor() {
    super();
    this.url = 'shop/users';
  }
}
