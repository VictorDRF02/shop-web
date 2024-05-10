import { Injectable, inject } from '@angular/core';
import { Model } from '../../models/model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ModelService<T extends Model> {
  protected http: HttpClient = inject(HttpClient);
  /** Url of the model in the API, example: `shop/model` */
  url: string = '';
  constructor() {}

  /**
   * Get the Url to do the *CRUD*
   * @returns The Url of the model in the *API*
   */
  getUrl() {
    return environment.apiUrl + this.url;
  }

  /**
   * Get an element by id.
   * @param id - id of element.
   * @returns An observable with the element.
   */
  getOne(id: number | string): Observable<T> {
    return this.http.get<T>(`${this.getUrl()}/${id}/`);
  }

  /**
   * Get all elements by params
   * @param params - The params
   * @returns
   */
  getAll(params: any = {}): Observable<T[]> {
    return this.http.get<T[]>(`${this.getUrl()}/`, { params: params });
  }

  /**
   * Create or update an element.
   * @param element - The element to create or update.
   * @returns An observable with the element.
   */
  save(element: FormData): Observable<any> {
    if (!!element.get('id')) {
      return this.http.put<T>(
        `${this.getUrl()}/${element.get('id')}/`,
        element
      );
    } else {
      return this.http.post<T>(`${this.getUrl()}/`, element);
    }
  }

  /**
   * Delete an element by id.
   * @param id - Id of element to delete.
   * @returns An observable with the response.
   */
  delete(id: number | string): Observable<any> {
    return this.http.delete<T>(`${this.getUrl()}/${id}/`);
  }

  /**
   * Convert to an `FormData` object the given model.
   * @param model - Model to convert.
   * @returns The FormData object.
   */
  convertToFormData(model: any): FormData {
    const especialProps = ['image'];
    const arrayProps = ['products', 'categories'];

    // Init FormData
    const formData = new FormData();

    // Build FormData
    for (let prop in model) {
      // Validations
      if (
        !especialProps.includes(prop) &&
        !(model[prop] == '' || model[prop].length == 0)
      ) {
        // If is an array
        if (arrayProps.includes(prop)) {
          const array = model[prop];
          for (const e of array) {
            formData.append(prop, e);
          }
          continue;
        }
        // Append prop
        formData.append(prop, model[prop]);
        continue;
      }

      // Specials props
      if (prop == 'image' && typeof model[prop] != 'string' && !!model[prop]) {
        formData.append(prop, model[prop], model[prop].name);
      }
    }
    return formData;
  }
}
