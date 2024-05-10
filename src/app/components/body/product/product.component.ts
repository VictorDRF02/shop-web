import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from '../../../models/product';
import { ProductService } from '../../../services/models/product.service';
import { ModalService } from '../../../services/utils/modal.service';
import { AuthService } from '../../../services/utils/auth.service';
import { ProductAddEditComponent } from '../../modals/product-add-edit/product-add-edit.component';
import { switchMap } from 'rxjs';
import { CartItem } from '../../../models/cartItem';
import { ToastrService } from 'ngx-toastr';
import { CartItemService } from '../../../services/models/cart-item.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent implements OnInit {
  @Input() product?: Product;
  @Input() quantity?: number;
  @Output() updateEmitter = new EventEmitter<any>();

  isAdmin: boolean = false;
  images: string[] = [];
  quantityAux: number = 0;

  constructor(
    private _productService: ProductService,
    private _authService: AuthService,
    private _modalService: ModalService,
    private _cdr: ChangeDetectorRef,
    private _cartItemService: CartItemService,
    private _toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.isAdmin = this._authService.user.is_admin || false;
    this.quantityAux = this.quantity || 0
    if (this.product) {
      this.images = this._productService.getImages(this.product);
    }
  }

  /**
   * Opens a modal for add, edit or delete products.
   * @param type - Action type (add, edit or delete).
   * @param data - Model data.
   */
  openProductModal(
    type: 'add' | 'edit' | 'delete',
    data: Product | null = null
  ) {
    switch (type) {
      case 'add':
      case 'edit':
        this._modalService
          .openModal(ProductAddEditComponent, data)
          .closed.subscribe(() => {
            this._cdr.detectChanges();
          });
        break;
      case 'delete':
        if (data) {
          this._modalService
            .openConfirmDelete('Product', data)
            .closed.subscribe(() => {
              this._cdr.detectChanges();
            });
        }
        break;
    }
  }

  /**
   * Add a value to quantity
   * @param number - Value to add.
   */
  addQuantity(number: number) {
    if (this.quantity) {
      const auxQuantity = number + this.quantityAux;
      if (auxQuantity > 0 && auxQuantity < 1000) {
        this.quantityAux = auxQuantity;
      }
    }
  }

  /**
   * Add product to user cart
   */
  addToCart() {
    if (!!this.product?.id && this._authService.user.id && this.quantity) {
      const cartItem: CartItem = {
        product: this.product.id,
        user: this._authService.user.id,
        quantity: this.quantityAux,
      };
      const formData: FormData =
        this._cartItemService.convertToFormData(cartItem);
      this._cartItemService
        .save(formData)
        .pipe(
          switchMap((cs) => {
            return this._authService.updateUser();
          })
        )
        .subscribe({
          next: () => {
            this.updateEmitter.emit();
          },
          error: (error) => {
            this._toastr.error('Ha ocurrido un error');
          },
        });
    }
  }
}
