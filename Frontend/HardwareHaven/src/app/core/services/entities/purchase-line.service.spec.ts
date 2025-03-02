import { TestBed } from '@angular/core/testing';

import { PurchaseLineService } from './purchase-line.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PurchaseLineService', () => {
  let service: PurchaseLineService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PurchaseLineService]
    });
    service = TestBed.inject(PurchaseLineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
