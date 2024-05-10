import { ChangeDetectorRef, Component, EventEmitter, Output } from '@angular/core';
import { Product } from '../../../models/product';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../services/models/product.service';
import { ProductAddEditComponent } from '../../modals/product-add-edit/product-add-edit.component';
import { ModalService } from '../../../services/utils/modal.service';
import { AuthService } from '../../../services/utils/auth.service';
import { CartItemService } from '../../../services/models/cart-item.service';
import { CartItem } from '../../../models/cartItem';
import { ToastrService } from 'ngx-toastr';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent {
  @Output() updateEmitter = new EventEmitter<any>();
  product: Product | undefined;
  images: string[] = [];
  indexImg: number = 0;
  quantity: number = 1;
  isLoading: boolean = false;
  isAdmin: boolean = false;

  constructor(
    private _productService: ProductService,
    private _cartItemService: CartItemService,
    private _route: ActivatedRoute,
    private _modalService: ModalService,
    private _cdr: ChangeDetectorRef,
    private _authService: AuthService,
    private _toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.isAdmin = this._authService.user.is_admin || false;
    this.isLoading = true;
    const id = Number(this._route.snapshot.paramMap.get('id'));
    this._productService.getOne(id).subscribe((p) => {
      this.product = p;
      this.images = this._productService.getImages(this.product);
      this.isLoading = false;
    });
  }

  /**
   * Add a value to quantity.
   * @param number - Value to add.
   */
  addQuantity(number: number) {
    const auxQuantity = number + this.quantity;
    if (auxQuantity > 0 && auxQuantity < 1000) {
      this.quantity = auxQuantity;
    }
  }

  /**
   * Add product to user cart
   */
  addToCart() {
    if (!!this.product?.id && this._authService.user.id) {
      const cartItem: CartItem = {
        product: this.product.id,
        user: this._authService.user.id,
        quantity: this.quantity,
      };
      const formData: FormData =
        this._cartItemService.convertToFormData(cartItem);
      this._cartItemService
        .save(formData)
        .pipe(
          switchMap((cs) => {
            this._toastr.success('Agregado correctamente');
            return this._authService.updateUser();
          })
        )
        .subscribe({
          next: () => {
            this.updateEmitter.emit()
          },
          error: (error) => {
            this._toastr.error('Ha ocurrido un error');
          },
        });
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
}
