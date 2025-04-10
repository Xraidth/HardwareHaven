import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UserService } from '../../core/services/entities/user.service.js';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SweetAlertService } from '../../core/services/notifications/sweet-alert.service.js';
import { ToastService } from '../../core/services/notifications/toast.service.js';
import { SessionService } from '../../core/services/share/session.service.js';
import { CommonModule } from '@angular/common';
import { ShareService } from '../../core/services/share/share.service.js';
import { directed } from '../../shared/functions/functions.js';
declare var bootstrap: any;

@Component({
  selector: 'home',
  standalone: true,
  imports: [HttpClientModule, FormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [UserService, ShareService]
})
export class HomeComponent implements OnInit {

  private user: any;
  public username: string = '';
  public password: string = '';
  public rememberKey: boolean = false;
  private intervalId: any;
  public errorServer: boolean = false;
  public emailOffers:string = '';
  constructor(
    private serverUser: UserService,
    private router: Router,
    private sweetAlertService: SweetAlertService,
    private toastService: ToastService,
    private shareServer:ShareService
  ) {}



  ngOnInit(): void {
    this.someFunction();
    this.checkServer();
    const previousUser =SessionService.rememberSession()
    if(previousUser){

     directed(previousUser.tipoUsuario, this.router);
    }



    this.startCarousel(5000);
  }

  async someFunction() {
    if (!SessionService.rememberOffer()) {
      this.emailOffers = await this.sweetAlertService.receiveOffers();
      SessionService.saveOfferNotice();
    }
  }


  startCarousel(time:number){
    const myCarousel = document.querySelector('#carouselExample') as HTMLElement;
    const carousel = new bootstrap.Carousel(myCarousel, {
      interval: time,
      ride: 'carousel'
    });


    this.intervalId = setInterval(() => {
      carousel.next();
    }, time);
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }


  async login(){
    this.serverUser.login({name:this.username, password:this.password}).subscribe({
      next: (r: any) => {
        try {

          if (r) {
            this.user = SessionService.saveSession(r.jwt,this.rememberKey);
            this.errorServer=false;
            directed(this.user.tipoUsuario, this.router)
          } else {
            this.sweetAlertService.showError("The server response is invalid.");
          }
        } catch (error:any) {
          const errores = error.error.errors || [];
          const messageErrors = errores.join(', ');
          const message = error.error.message || [];
          this.sweetAlertService.showError(messageErrors + ", " + message);
        }
      },
      error: (error:any) => {
        const errores = error.error.errors || [];
        const message = error.error.message || [];
        const messageErrors = errores.join(', ');

        if (messageErrors.length === 0) {
        this.toastService.showToast('Acceso denegado');
      }
      else{this.sweetAlertService.showError(messageErrors +", "+ message);}
    }
  });
  }


  registerUser() {
    this.sweetAlertService.mostrarFormularioRegistro().then(credenciales => {
      if (credenciales) {
        this.serverUser.create({
          name: credenciales.username,
          password: credenciales.password,
          email: credenciales.email,
          tipoUsuario: credenciales.userType,
          fechaNac: credenciales.fechaNac,
          sexo:credenciales.sexo,
          direccion:credenciales.direccion
        }).subscribe({
          next: (r: any) => {
            if (r) {
              this.user = SessionService.saveSession(r.jwt, true);
              directed(this.user.tipoUsuario, this.router);
            } else {
              this.sweetAlertService.showError('Data response not found');
            }
          },
          error: (error: any) => {
            const errores = error.error.errors || [];
            const message = error.error.message || 'An unknown error occurred';
            const messageErrors = errores.join(', ');
            this.sweetAlertService.showError(messageErrors ? messageErrors : message);
          }
        });
      }
    }).catch((error: any) => {
      const errores = error.error.errors || [];
      const message = error.error.message || 'An error occurred while displaying the registration form';
      const messageErrors = errores.join(', ');
      this.sweetAlertService.showError(messageErrors ? messageErrors : message);
    });
  }

  checkServer() {
    this.shareServer.ComeOn().subscribe({
        next: (r: any) => {
            this.errorServer = !(r && r.status);
        },
        error: () => {
            this.errorServer = true;
        }
    });}


  }









