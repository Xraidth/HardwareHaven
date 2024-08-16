import { TestBed } from '@angular/core/testing';

import { ComponenteConectorService } from './componente-conector.service';

describe('ComponenteConectorService', () => {
  let service: ComponenteConectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComponenteConectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
