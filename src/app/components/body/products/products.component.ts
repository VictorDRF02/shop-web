import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Category } from '../../../models/category';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../../../services/models/category.service';
import { ProductComponent } from '../product/product.component';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/utils/auth.service';
import { ModalService } from '../../../services/utils/modal.service';
import { CategoryAddEditComponent } from '../../modals/category-add-edit/category-add-edit.component';
import { ProductAddEditComponent } from '../../modals/product-add-edit/product-add-edit.component';
import { Model } from '../../../models/model';
import { Product } from '../../../models/product';
import { ProductService } from '../../../services/models/product.service';
import { FormsModule } from '@angular/forms';
import { error } from 'console';

@Component({
  selector: 'app-products',
  standalone: true,
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
  imports: [ProductComponent, FormsModule],
})
export class ProductsComponent implements OnInit, AfterViewInit {
  /** Selected Category */
  category?: Category;
  /** All Categories */
  categories?: Category[];
  /** Default category id */
  defaultId: number = 1;
  /** Categories loading */
  isLoadingCategories: boolean = false;
  isAdmin: boolean = false;
  /** Showed Products */
  products: Product[] = [];
  /** Search product param */
  search: string = '';
  /** Products limit */
  limit: number = 0;
  /** Products Page */
  page: number = 0;
  /** Products loading */
  isLoadingProducts: boolean = true;
  canSearchProducts: boolean = true;
  @ViewChild('marker') marker!: ElementRef;

  constructor(
    private _categoryService: CategoryService,
    private _productService: ProductService,
    private _tostr: ToastrService,
    private _authService: AuthService,
    private _modalService: ModalService,
    private _cdr: ChangeDetectorRef,
    private _route: ActivatedRoute
  ) {
    this.defaultId = +(this._route.snapshot.paramMap.get('id') || 1);
  }

  ngOnInit(): void {
    this.isAdmin = this._authService.user.is_admin || false;
    this.getCategories(this.defaultId);
  }

  ngAfterViewInit() {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !this.isLoadingProducts) {
        this.getNextPage();
      }
    });

    observer.observe(this.marker.nativeElement);
  }
  /**
   * Set current category
   * @param category - Category to set.
   */
  setCategory(category: Category) {
    this.category = category;
    this.resetProductsParams();
    this._cdr.detectChanges();
  }

  /**
   * Get categories form the server.
   * @param id - Selected category id.
   */
  getCategories(id: number) {
    this.isLoadingCategories = true;
    this._categoryService.getAll({ order: 'id' }).subscribe({
      next: (cs) => {
        this.categories = cs;
        this.category = this.categories?.find((c) => c.id == id);
        this._cdr.detectChanges();
        this.isLoadingCategories = false;
        return this.resetProductsParams();
      },
      error: (error) => {
        this._tostr.error('Ha ocurrido un error');
        this.isLoadingCategories = false;
      },
    });
  }

  /**
   * Reset products params to default state.
   */
  resetProductsParams() {
    this.products = [];
    this.limit = 12;
    this.page = 1;
    this.canSearchProducts = true;
    this.searchProducts();
  }

  /**
   * Get the next products page.
   */
  getNextPage() {
    if (!this.isLoadingProducts && this.canSearchProducts) {
      this.page++;
      this.searchProducts();
    }
  }

  /**
   * Search in products by a string.
   * @param search - String to search.
   */
  searchProducts() {
    const params = {
      search: this.search,
      category: this.category?.id || 1,
      page_size: this.limit,
      page: this.page,
    };
    this.isLoadingProducts = true;
    this._productService.getAll(params).subscribe({
      next: (res: any) => {
        this.products = [...this.products, ...res.results];
        this.isLoadingProducts = false;
        this._cdr.detectChanges();
      },
      error: (error) => {
        this.isLoadingProducts = false;
        if (error.error.detail == 'Invalid page.') {
          this.canSearchProducts = false;
        }
      },
    });
  }

  /**
   * Opens a modal for add, edit or delete products or categories.
   * @param type - Action type (add, edit or delete).
   * @param model - Model type (Category or Product).
   * @param data - Model data.
   */
  openModal(
    type: 'add' | 'edit' | 'delete',
    model: 'Category' | 'Product',
    data: Model | null = null
  ) {
    switch (type) {
      case 'add':
      case 'edit':
        this._modalService
          .openModal(
            model == 'Category'
              ? CategoryAddEditComponent
              : ProductAddEditComponent,
            data
          )
          .closed.subscribe(() => {
            this.getCategories(this.defaultId);
          });
        break;
      case 'delete':
        if (data) {
          this._modalService
            .openConfirmDelete(model, data)
            .closed.subscribe(() => {
              this.getCategories(this.defaultId);
            });
        }
        break;
    }
  }
}
