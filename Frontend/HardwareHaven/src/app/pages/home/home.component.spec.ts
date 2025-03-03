
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture,fakeAsync , TestBed, tick } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { Router } from '@angular/router';
import { SweetAlertService } from '../../core/services/notifications/sweet-alert.service';
import { ToastService } from '../../core/services/notifications/toast.service';
import { ShareService } from '../../core/services/share/share.service';
import { of, throwError } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../core/services/entities/user.service';
import { UserServiceMock } from '../../../__mocks__/userServiceMock';
import { RouterMock } from '../../../__mocks__/routerMock';
import { SweetAlertServiceMock } from '../../../__mocks__/sweetAlertServiceMock';
import { ToastServiceMock } from '../../../__mocks__/toastServiceMock';
import { ShareServiceMock } from '../../../__mocks__/shareServiceMock';
import { SessionServiceMock } from '../../../__mocks__/sessionServiceMock';
import { By } from '@angular/platform-browser';
import { SessionService } from '../../core/services/share/session.service';


/*
Siguen los errores dentro de los Mocks

*/
describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let sweetAlertService: SweetAlertServiceMock;
  let userService: UserServiceMock;
  let toastService: ToastServiceMock;
  let shareService: ShareServiceMock;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [],
      imports: [HttpClientTestingModule, FormsModule, CommonModule, HomeComponent],
      providers: [
        { provide: UserService, useClass: UserServiceMock },
        { provide: Router, useClass: RouterMock },
        { provide: SweetAlertService, useClass: SweetAlertServiceMock },
        { provide: ToastService, useClass: ToastServiceMock},
        { provide: ShareService, useClass: ShareServiceMock },
        {provide: SessionService, useClass: SessionServiceMock}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;


    sweetAlertService = TestBed.inject(SweetAlertService) as any;
    userService = TestBed.inject(UserService) as any;
    toastService = TestBed.inject(ToastService) as any;
    shareService = TestBed.inject(ShareService) as any;
    component.startCarousel = jest.fn();



  });

  it('should create sweetAlertService',()=>{
    expect(sweetAlertService).toBeTruthy();
  });
it('should create userService',()=>{
  expect(userService).toBeTruthy();
});

it('should create toastService',()=>{
  expect(toastService).toBeTruthy();
});


it('should create shareService',()=>{
  expect(shareService).toBeTruthy();
});



  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check server', (() => {

    component.checkServer();

    expect(shareService.ComeOn).toHaveBeenCalled();
  }));

  it('should initialize correctly', () => {
    const spy = jest.spyOn(component, 'someFunction');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });


  it('should called offer funtions', (()=>{
     component.someFunction();

    expect(SessionServiceMock.rememberOffer).toHaveBeenCalled();
    expect(SessionServiceMock.saveOfferNotice).toHaveBeenCalled();
    expect(sweetAlertService.receiveOffers).toHaveBeenCalled();
  }));



it('should login successfully', (() => {


  component.username = 'testuser';
  component.password = 'password';
  component.rememberKey = true;
  component.login();


  expect(userService.login).toHaveBeenCalled();
}));


  it('should handle login error', (() => {
  jest.spyOn(userService, 'login').mockReturnValue(
    throwError(() => ({ error: { message: 'Invalid credentials' } }))
  );
  component.login();

  expect(sweetAlertService.showError).toHaveBeenCalled();
}));

  it('should register user successfully', (() => {
    component.registerUser();

    expect(userService.create).toHaveBeenCalled();
  }));

  it('should handle registration error', (() => {
    jest.spyOn(userService, 'create').mockReturnValue(
      throwError(() => ({ error: { message: 'User already exists' } }))
    );

    component.registerUser();


    expect(sweetAlertService.showError).toHaveBeenCalled();
  }));
  it('should call login when "Sign In" button is clicked', () => {
    jest.spyOn(component, 'login');
    const loginButton = fixture.debugElement.query(By.css('#loginButton'));
    loginButton.nativeElement.click();
    expect(component.login).toHaveBeenCalled();
  });

  it('should call registerUser when "Register" button is clicked', () => {
    jest.spyOn(component, 'registerUser');
    const registerButton = fixture.debugElement.query(By.css('#registerButton'));
    registerButton.nativeElement.click();
    expect(component.registerUser).toHaveBeenCalled();
  });



});
