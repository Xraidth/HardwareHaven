import { TestBed } from '@angular/core/testing';

import { PurchaseService } from './purchase.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PurchaseService', () => {
  let service: PurchaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PurchaseService]
    });
    service = TestBed.inject(PurchaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
