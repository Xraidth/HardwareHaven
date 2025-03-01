import { TestBed } from '@angular/core/testing';

import { ShareService } from './share.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ShareService', () => {
  let service: ShareService;

  beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [ShareService]
      });
      service = TestBed.inject(ShareService);
    });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
