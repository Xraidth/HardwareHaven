import { TestBed } from '@angular/core/testing';

import { LineaCompraService } from './linea-compra.service';

describe('LineaCompraService', () => {
  let service: LineaCompraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LineaCompraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
