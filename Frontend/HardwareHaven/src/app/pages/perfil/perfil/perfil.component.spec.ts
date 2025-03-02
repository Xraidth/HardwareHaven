import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileComponent } from './perfil.component';
import { Router } from '@angular/router';
import { SweetAlertService } from '../../../core/services/notifications/sweet-alert.service';
import { UserService } from '../../../core/services/entities/user.service';
import { UserNavComponent } from '../../../shared/user-nav/user-nav.component';
import { of } from 'rxjs';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let router: Router;
  let sweetAlertService: SweetAlertService;
  let userService: UserService;

  beforeEach(async () => {

    const routerMock = {
      navigate: jasmine.createSpy('navigate')
    };

    const sweetAlertServiceMock = {
      confirmBox: jasmine.createSpy('confirmBox').and.returnValue(Promise.resolve({ isConfirmed: true })),
      simpleAlert: jasmine.createSpy('simpleAlert'),
      showError: jasmine.createSpy('showError')
    };

    const userServiceMock = {
      delete: jasmine.createSpy('delete').and.returnValue(of({}))
    };

    await TestBed.configureTestingModule({
      imports: [ProfileComponent, UserNavComponent],
      providers: [
        { provide: Router, useValue: routerMock },
        { provide: SweetAlertService, useValue: sweetAlertServiceMock },
        { provide: UserService, useValue: userServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    sweetAlertService = TestBed.inject(SweetAlertService);
    userService = TestBed.inject(UserService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call goBack and navigate to home', () => {

    component.usuario = { tipoUsuario: 'admin' };

    component.goBack();

    expect(router.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('should delete account when borrarCuenta is called', () => {
    component.usuario = { id: 123, tipoUsuario: 'admin' };

    component.borrarCuenta();


    expect(userService.delete).toHaveBeenCalledWith(123);

    expect(sweetAlertService.simpleAlert).toHaveBeenCalledWith('Su cuenta fue eliminada, gracias por comprar en Hardware Haven');
  });
});
