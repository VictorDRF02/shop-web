import { Component, Input } from '@angular/core';
import { Category } from '../../../models/category';
import { CategoryService } from '../../../services/models/category.service';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-category-add-edit',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './category-add-edit.component.html',
  styleUrl: './category-add-edit.component.scss',
})
export class CategoryAddEditComponent {
  /** Category to add or edit. */
  @Input() data: Category = {
    name: '',
    description: '',
    image: '',
    products: [],
  };

  constructor(
    private _categoryService: CategoryService,
    private _toastrService: ToastrService,
    private _modal: NgbActiveModal
  ) {}

  /**
   * Save category.
   * @param category - Category to save.
   */
  save() {
    const formData = this._categoryService.convertToFormData(this.data);
    this._categoryService.save(formData).subscribe({
      next: (res) => {
        this._toastrService.success(
          `Categoría ${!this.data.id ? 'agregado' : 'editado'} correctamente.`
        );
        this.close();
      },
      error: (error) => {
        this._toastrService.error(`Ha ocurrido un error.`);
      },
    });
  }

  /**
   * Update category image.
   */
  setImage(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.data.image = file;
    }
  }

  /**
   * Close Modal.
   */
  close() {
    this._modal.close();
  }
}
