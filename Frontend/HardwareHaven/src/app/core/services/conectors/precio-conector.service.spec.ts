import { TestBed } from '@angular/core/testing';

import { PrecioConectorService } from './precio-conector.service';

describe('PrecioConectorService', () => {
  let service: PrecioConectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrecioConectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
