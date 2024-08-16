import { TestBed } from '@angular/core/testing';

import { CategoriaConectorService } from './categoria-conector.service';

describe('CategoriaConectorService', () => {
  let service: CategoriaConectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoriaConectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
