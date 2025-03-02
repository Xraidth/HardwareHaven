import { of, Observable } from "rxjs";

export class UserServiceMock {

  login(): Observable<any> {
    return of({ jwt: 'token' });
  }


  create(): Observable<any> {
    return of({ jwt: 'token' });
  }
}
