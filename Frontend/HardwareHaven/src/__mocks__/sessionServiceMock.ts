export class SessionServiceMock {
  public static user: any = null;
  public static jwt: any = null;


  public static rememberSession = jest.fn(() => {
    return null;
  });


  public static saveSession = jest.fn((jwt: any, rememberKey: boolean) => {
    this.jwt = jwt;
    this.user = { tipoUsuario: 'admin' };
    return this.user;
  });

  public static saveOfferNotice = jest.fn(() => {
  });

  public static rememberOffer = jest.fn(() => {

    return undefined;
  });
}
