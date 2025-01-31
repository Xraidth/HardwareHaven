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
  public recordarClave: boolean = false;
  private intervalId: any;
  public errorServer: boolean = false;
  public emailofertas:string = '';
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
    const usuariarioAnterior =SessionService.recordarSession()
    if(usuariarioAnterior){

     directed(usuariarioAnterior.tipoUsuario, this.router);
    }



    this.iniciarCarousel(5000);
  }

  async someFunction() {
    if (!SessionService.recordarOferta()) {
      this.emailofertas = await this.sweetAlertService.recibirOfertas();
      SessionService.guardarAvisoDeOferta();
    }
  }


  iniciarCarousel(time:number){
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
            this.user = SessionService.guardarSession(r.jwt,this.recordarClave);
            this.errorServer=false;
            directed(this.user.tipoUsuario, this.router)
          } else {
            this.sweetAlertService.mostrarError("La respuesta del servidor es inválida.");
          }
        } catch (error) {
          const mensajeError = String(error);
          this.sweetAlertService.mostrarError(mensajeError);
        }
      },
      error: (error:any) => {
        const errores = error.error.errors || [];
        const message = error.error.message || [];
        const mensajeErrores = errores.join(', ');

        if (mensajeErrores.length === 0) {
        this.toastService.showToast('Acceso denegado');
      }
      else{this.sweetAlertService.mostrarError(mensajeErrores +", "+ message);}
    }
  });
  }


  async loginFetch() {
    try {
      const response = await this.serverUser.loginFetch({
        name: this.username,
        password: this.password,
      });

      if (!response.ok) {

        const errorBody = await response.json();
        const errores = errorBody.errors || [];
        const message = errorBody.message || 'Error desconocido.';
        const mensajeErrores = errores.join(', ');

        if (mensajeErrores.length === 0) {
          this.toastService.showToast('Acceso denegado');
        } else {
          this.sweetAlertService.mostrarError(mensajeErrores + ', ' + message);
        }
        return;
      }

      const r = await response.json();

      if (r) {
        this.user = SessionService.guardarSession(r.jwt, this.recordarClave);
        this.errorServer = false;
        directed(this.user.tipoUsuario, this.router);
      } else {
        this.sweetAlertService.mostrarError('La respuesta del servidor es inválida.');
      }
    } catch (error) {
      const mensajeError = String(error);
          this.sweetAlertService.mostrarError(mensajeError);
    }
  }




async registrarUsuario() {
  const credenciales = await this.sweetAlertService.mostrarFormularioRegistro();

  if (credenciales) {
    try {
      this.serverUser.createFetch({
        name: credenciales.username,
        password: credenciales.password,
        email: credenciales.email,
        tipoUsuario: credenciales.userType
      }).then((response) => {
        return response.json();
      }).then((r) => {
        if (r && r.data) {
          const user: any = r.data;
          this.user = user;
          SessionService.usuario = this.user;
          this.username = this.user.name;
          this.password = this.user.password;
          setTimeout(()=>{this.loginFetch()},200);
        } else {
          console.error('No se encontraron datos en la respuesta');
        }
      }).catch((error) => {
        console.error('Error al crear el usuario:', error);
      });
      }

     catch (error:any) {
      console.error('Error en la llamada HTTP:', error);
      const errores = error.error.errors || [];
      const mensajeErrores = errores.join(', ');
      const message = error.error.message || [];
      this.sweetAlertService.mostrarError(mensajeErrores + ", " + message);
    }

    }
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

gotoAyuda(){
  this.router.navigate(['ayuda']);
}

  }









