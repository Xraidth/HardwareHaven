import { of } from 'rxjs';

export class ShareServiceMock {
  ComeOn = jest.fn(() => of({ status: true })); // Mockea el método ComeOn
}
