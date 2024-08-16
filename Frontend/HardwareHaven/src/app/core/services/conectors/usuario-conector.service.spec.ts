import { TestBed } from '@angular/core/testing';

import { UsuarioConectorService } from './usuario-conector.service';

describe('UsuarioConectorService', () => {
  let service: UsuarioConectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuarioConectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
