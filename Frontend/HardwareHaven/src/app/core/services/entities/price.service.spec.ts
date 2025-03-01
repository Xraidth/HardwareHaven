import { TestBed } from '@angular/core/testing';

import { PriceService } from './price.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PriceService', () => {
  let service: PriceService;

   beforeEach(() => {
     TestBed.configureTestingModule({
       imports: [HttpClientTestingModule],
       providers: [PriceService]
     });
     service = TestBed.inject(PriceService);
   });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
