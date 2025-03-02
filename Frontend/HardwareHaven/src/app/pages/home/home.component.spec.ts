
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { Router } from '@angular/router';
import { SweetAlertService } from '../../core/services/notifications/sweet-alert.service';
import { ToastService } from '../../core/services/notifications/toast.service';
import { ShareService } from '../../core/services/share/share.service';
import { of, throwError } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { UserService } from '../../core/services/entities/user.service';
import { UserServiceMock } from '../../../__mocks__/userServiceMock';
import { RouterMock } from '../../../__mocks__/routerMock';
import { SweetAlertServiceMock } from '../../../__mocks__/sweetAlertServiceMock';
import { ToastServiceMock } from '../../../__mocks__/toastServiceMock';
import { ShareServiceMock } from '../../../__mocks__/shareServiceMock';
import { SessionServiceMock } from '../../../__mocks__/sessionServiceMock';
import { By } from '@angular/platform-browser';


jest.mock('../../shared/functions/functions', () => ({
  directed: jest.fn()
}));

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let sweetAlertService: SweetAlertServiceMock;
  let userService: UserServiceMock;
  let toastService: ToastServiceMock;
  let shareService: ShareServiceMock;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [HttpClientModule, FormsModule, CommonModule],
      providers: [
        { provide: UserService, useClass: UserServiceMock },
        { provide: Router, useClass: RouterMock },
        { provide: SweetAlertService, useClass: SweetAlertServiceMock },
        { provide: ToastService, useClass: ToastServiceMock},
        { provide: ShareService, useClass: ShareServiceMock },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;


    sweetAlertService = TestBed.inject(SweetAlertService) as any;
    userService = TestBed.inject(UserService) as any;
    toastService = TestBed.inject(ToastService) as any;
    shareService = TestBed.inject(ShareService) as any;

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize correctly', fakeAsync(() => {
    jest.spyOn(SessionServiceMock, 'rememberSession').mockReturnValue(null);
    Object.defineProperty(SessionServiceMock, 'rememberOffer', {
      get: jest.fn(() => false),
    });
    jest.spyOn(SessionServiceMock, 'saveOfferNotice');

    component.ngOnInit();
    tick();

    expect(sweetAlertService.receiveOffers).toHaveBeenCalled();
    expect(SessionServiceMock.saveOfferNotice).toHaveBeenCalled();
  }));

  it('should login successfully', fakeAsync(() => {
    component.username = 'testuser';
    component.password = 'password';
    component.rememberKey = true;
    component.login();
    tick();

    expect(userService.login).toHaveBeenCalledWith({ name: 'testuser', password: 'password' });
  }));

  it('should handle login error', fakeAsync(() => {
  jest.spyOn(userService, 'login').mockReturnValue(
    throwError(() => ({ error: { message: 'Invalid credentials' } }))
  );

  component.login();
  tick();

  expect(sweetAlertService.showError).toHaveBeenCalledWith('Invalid credentials');
}));

  it('should register user successfully', fakeAsync(() => {
    component.registerUser();
    tick();

    expect(userService.create).toHaveBeenCalled();
  }));

  it('should handle registration error', fakeAsync(() => {
    jest.spyOn(userService, 'create').mockReturnValue(
      throwError(() => ({ error: { message: 'User already exists' } }))
    );

    component.registerUser();
    tick();

    expect(sweetAlertService.showError).toHaveBeenCalledWith('User already exists');
  }));

  it('should call login when "Ingresar" button is clicked', () => {
    jest.spyOn(component, 'login');
    const loginButton = fixture.debugElement.query(By.css('#loginButton'));
    loginButton.nativeElement.click();
    expect(component.login).toHaveBeenCalled();
  });

  it('should call registerUser when "Registrarse" button is clicked', () => {
    jest.spyOn(component, 'registerUser');
    const registerButton = fixture.debugElement.query(By.css('#registerButton'));
    registerButton.nativeElement.click();
    expect(component.registerUser).toHaveBeenCalled();
  });



});
