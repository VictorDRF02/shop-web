import { Injectable } from '@angular/core';
import { ModelService } from './model.service';
import { Category } from '../../models/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService extends ModelService<Category> {
  constructor() {
    super();
    this.url = 'shop/categories';
  }
}
