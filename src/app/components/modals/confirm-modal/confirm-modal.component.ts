import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Model } from '../../../models/model';
import { CategoryService } from '../../../services/models/category.service';
import { ProductService } from '../../../services/models/product.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-confirm-modal',
  standalone: true,
  imports: [],
  templateUrl: './confirm-modal.component.html',
  styleUrl: './confirm-modal.component.scss',
})
export class ConfirmModalComponent {
  /** Model data (id is required). */
  @Input() data!: Model;
  /** Model Name. */
  @Input() model: string = '';

  /** Actions to execute when a model is delete. */
  subscribeActions = {
    next: (res: any) => {
      this._toastrService.success(
        `Eliminado correctamente.`
      );
      this.close();
    },
    error: (error: any) => {
      for (let e in error.error) {
        this._toastrService.error(error.error[e][0], e);
      }
      this._toastrService.error(`Ha ocurrido un error.`);
    },
  };
  
  constructor(
    private _modal: NgbActiveModal,
    private _productService: ProductService,
    private _categoryService: CategoryService,
    private _toastrService: ToastrService
  ) {}

  /**
   * Deletes the model.
   */
  del() {
    if (this.data.id) {
      switch (this.model) {
        case 'Category':
          this._categoryService.delete(this.data.id).subscribe(this.subscribeActions);
          break;
        case 'Product':
          this._productService.delete(this.data.id).subscribe(this.subscribeActions);
          break;
      }
      this.close();
    }
  }

  /**
   * Closes modal.
   */
  close() {
    this._modal.close();
  }
}
