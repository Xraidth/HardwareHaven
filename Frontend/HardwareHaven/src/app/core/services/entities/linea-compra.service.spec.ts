import { TestBed } from '@angular/core/testing';

import { PurchaseLineService } from './linea-compra.service';

describe('PurchaseLineService', () => {
  let service: PurchaseLineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PurchaseLineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
