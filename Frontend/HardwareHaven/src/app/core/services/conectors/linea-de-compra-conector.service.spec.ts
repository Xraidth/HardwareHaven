import { TestBed } from '@angular/core/testing';

import { LineaDeCompraConectorService } from './linea-de-compra-conector.service';

describe('LineaDeCompraConectorService', () => {
  let service: LineaDeCompraConectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LineaDeCompraConectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
