import { TestBed } from '@angular/core/testing';

import { ModelService } from './model.service';
import { Model } from '../../models/model';

describe('ModelService', () => {
  let service: ModelService<Model>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
