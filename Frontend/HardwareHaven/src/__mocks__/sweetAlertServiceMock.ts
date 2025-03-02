export class SweetAlertServiceMock {
  receiveOffers = jest.fn(() => Promise.resolve('test@example.com'));
  showError = jest.fn();
  mostrarFormularioRegistro = jest.fn(() =>
    Promise.resolve({
      username: 'test',
      password: '1234',
      email: 'test@example.com',
      userType: 'admin',
    })
  );
}
