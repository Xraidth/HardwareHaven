import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileComponent } from './perfil.component';
import { Router } from '@angular/router';
import { SweetAlertService } from '../../../core/services/notifications/sweet-alert.service';
import { UserService } from '../../../core/services/entities/user.service';
import { SessionService } from '../../../core/services/share/session.service';
import { of } from 'rxjs';
import { mock } from 'jest-mock-extended';

// Mock de servicios
jest.mock('../../../core/services/share/session.service', () => ({
  SessionService: {
    user: { id: 1, tipoUsuario: 'admin', username: 'Usuario123' },
  },
}));

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let router: Router;
  let sweetAlertService: SweetAlertService;
  let serverUser: UserService;

  beforeEach(async () => {
    // Mock de los servicios
    sweetAlertService = mock<SweetAlertService>();
    serverUser = mock<UserService>();
    serverUser.delete.mockReturnValue(of({ id: 1, username: 'Usuario123' })); // Mock de la llamada delete

    await TestBed.configureTestingModule({
      declarations: [ProfileComponent],
      providers: [
        { provide: Router, useValue: { navigate: jest.fn() } },
        { provide: SweetAlertService, useValue: sweetAlertService },
        { provide: UserService, useValue: serverUser },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize usuario on ngOnInit', () => {
    component.ngOnInit();
    expect(component.usuario).toBe(SessionService.user);
  });

  it('should call directed on goBack', () => {
    const directedSpy = jest.spyOn(require('../../../shared/functions/functions'), 'directed');
    component.goBack();
    expect(directedSpy).toHaveBeenCalledWith(component.usuario.tipoUsuario, router);
  });

  it('should call sweetAlertService.confirmBox when borrarCuenta is called', () => {
    sweetAlertService.confirmBox.mockResolvedValue({ isConfirmed: true });

    component.borrarCuenta();

    expect(sweetAlertService.confirmBox).toHaveBeenCalledWith('¿Estás seguro?', 'No podrás revertir esta acción.');
  });

  it('should call serverUser.delete and navigate when account is deleted', () => {
    sweetAlertService.confirmBox.mockResolvedValue({ isConfirmed: true });

    component.borrarCuenta();

    // Verificamos que la llamada delete haya sido hecha
    expect(serverUser.delete).toHaveBeenCalledWith(component.usuario.id);

    // Verificamos que se navegue a la página de inicio después de borrar la cuenta
    expect(router.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('should show error alert if delete fails', () => {
    sweetAlertService.confirmBox.mockResolvedValue({ isConfirmed: true });

    // Simulamos un error en la eliminación de cuenta
    serverUser.delete.mockReturnValue(of(null));

    component.borrarCuenta();

    expect(sweetAlertService.showError).toHaveBeenCalledWith('Error al eliminar la cuenta');
  });

  it('should show success alert if delete is successful', () => {
    sweetAlertService.confirmBox.mockResolvedValue({ isConfirmed: true });

    // Simulamos una respuesta exitosa
    serverUser.delete.mockReturnValue(of({ id: 1, username: 'Usuario123' }));

    component.borrarCuenta();

    expect(sweetAlertService.simpleAlert).toHaveBeenCalledWith('Su cuenta fue eliminada, gracias por comprar en Hardware Haven');
  });
});
