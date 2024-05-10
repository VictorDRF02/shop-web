import { Injectable } from '@angular/core';
import { ModelService } from './model.service';
import { Product } from '../../models/product';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService extends ModelService<Product> {
  constructor() {
    super();
    this.url = 'shop/products';
  }

  /**
   * Get the images of a product.
   * TODO: Cambiar el modelo en el API para que producto tenga relación de uno a muchos con un modelo Imagen.
   * @param product - The product
   * @returns The images or a placeholder.
   */
  getImages(product: Product): string[] {
    if (!!product.image) {
      return [product.image as string];
    }
    return [environment.apiUrl + 'uploads/uploads/products/placeholder.jpeg'];
  }
}
