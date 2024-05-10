import { Injectable, model } from '@angular/core';
import { ConfirmModalComponent } from '../../components/modals/confirm-modal/confirm-modal.component';
import { Model } from '../../models/model';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  options: NgbModalOptions = { centered: true, fullscreen: 'sm', size: 'lg' };

  constructor(private _dialog: NgbModal) {}

  /**
   * Opens a modal for an action in a determined model.
   * @param type - Type of action (add, edit or delete).
   * @param data - Data of model.
   * @param modelName - Model to execute the action.
   */
  openModal(modal: any, data: Model | null = null, options = this.options) {
    const dialog = this._dialog.open(modal, options);
    if (data) {
      dialog.componentInstance.data = data;
    }
    return dialog;
  }

  /**
   * Opens the modal of delete confirmation.
   * @param modelName - Model name (Ex: Product).
   * @param data - Model data (must have an id).
   */
  openConfirmDelete(modelName: string, data: Model) {
    const dialogDelete = this._dialog.open(ConfirmModalComponent, this.options);
    if (data) {
      dialogDelete.componentInstance.data = data;
      dialogDelete.componentInstance.model = modelName;
    }
    return dialogDelete;
  }
}
