import { of, Observable } from "rxjs";

export class UserServiceMock {

  login(body: {name: string, password: string}): Observable<any> {
    return of({ jwt: 'token' });
  }

  create(body: {name: string, password: string, email: string, tipoUsuario: string}): Observable<any> {
    return of({ jwt: 'token' });
  }

  getAll(): Observable<any> {
    return of([]);
  }

  getOne(id: number): Observable<any> {
    return of(null);
  }

  delete(id: number): Observable<any> {
    return of(null);
  }

  update(id: number, body: { newPassword: string, oldPassword: string, newUserName: string, newEmail: string, newUserType: string }): Observable<any> {
    return of(null);
  }

  updateUserName(id: number, body: { newUserName: string, password: string }): Observable<any> {
    return of(null);
  }

  updateUserPassword(id: number, body: { newPassword: string, oldPassword: string }): Observable<any> {
    return of(null);
  }
}
