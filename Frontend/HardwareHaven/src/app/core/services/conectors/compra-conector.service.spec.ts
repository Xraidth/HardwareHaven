import { TestBed } from '@angular/core/testing';

import { CompraConectorService } from './compra-conector.service';

describe('CompraConectorService', () => {
  let service: CompraConectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompraConectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
