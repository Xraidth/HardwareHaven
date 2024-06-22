import { TestBed } from '@angular/core/testing';

import { PrecioService } from './precio.service';

describe('PrecioService', () => {
  let service: PrecioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrecioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
