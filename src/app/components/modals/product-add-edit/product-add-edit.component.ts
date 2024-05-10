import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../../models/product';
import { ProductService } from '../../../services/models/product.service';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Category } from '../../../models/category';
import { CategoryService } from '../../../services/models/category.service';

@Component({
  selector: 'app-product-add-edit',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './product-add-edit.component.html',
  styleUrl: './product-add-edit.component.scss',
})
export class ProductAddEditComponent implements OnInit {
  /** Product to add or edit. */
  @Input() data: Product = {
    name: '',
    description: '',
    price: 0,
    image: '',
    categories: [],
  };
  /** Categories to show in the select. */
  categories?: Category[];
  isLoading: boolean = true;

  constructor(
    private _productService: ProductService,
    private _categoryService: CategoryService,
    private _toastrService: ToastrService,
    private _modal: NgbActiveModal,
  ) {}
  
  ngOnInit(): void {
    this.isLoading = true;
    this._categoryService.getAll().subscribe((res) => {
      this.categories = res
    this.isLoading = false;
    })
  }

  /**
   * Save product.
   */
  save() {
    this.data.categories?.push(1);
    const formData = this._productService.convertToFormData(this.data);
    this._productService.save(formData).subscribe({
      next: (res) => {
        this._toastrService.success(
          `Producto ${
            !this.data.id ? 'agregado' : 'editado'
          } correctamente.`
        );
        this.close();
      },
      error: (error) => {
        for (let e in error.error) {
          this._toastrService.error(error.error[e][0], e);
        }
        this._toastrService.error(`Ha ocurrido un error.`);
      },
    });
  }

  /**
   * Update product image.
   */
  uploadFile(event: any) {
    this.data.image = event.target.files[0];
  }

  /**
   * Close modal.
   */
  close() {
    this._modal.close();
  }
}
