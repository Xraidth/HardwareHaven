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
  constructor(
    private serverUser: UserService,
    private router: Router,
    private sweetAlertService: SweetAlertService,
    private toastService: ToastService,
    private shareServer:ShareService
  ) {}



  ngOnInit(): void {
    //this.sweetAlertService.recibirOfertas();
    this.checkServer();
    const usuariarioAnterior =SessionService.recordarSession()
    if(usuariarioAnterior){

     directed(usuariarioAnterior.tipoUsuario, this.router);
    }



    this.iniciarCarousel(5000);
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


  login(){
    this.serverUser.login({name:this.username, password:this.password}).subscribe({
      next: (r: any) => {
        try {

          if (r && r.data) {

            this.user = r.data;
            SessionService.usuario = this.user;
            if(this.recordarClave){SessionService.guardarSession();}
            this.errorServer=false;
            SessionService.usuario.jwt = r.jwt;
            directed(this.user.tipoUsuario, this.router)
          } else {
            this.sweetAlertService.mostrarError("La respuesta del servidor es inválida.");
          }
        } catch (error) {
          const mensajeError = String(error);
          this.sweetAlertService.mostrarError(mensajeError);
        }
      },
      error: (e) => {
        const errores = e.error?.errors || [];
        const mensajeErrores = errores.join(', ');
        this.sweetAlertService.mostrarError(mensajeErrores);
        if (mensajeErrores.length === 0) {
        this.toastService.showToast('Acceso denegado');
      }
    }
  });
  }


async registrarUsuario() {
    const credenciales = await this.sweetAlertService.mostrarFormularioRegistro();
    if (credenciales) {
      this.serverUser.create({name:credenciales.username, password:credenciales.password, email:credenciales.email, tipoUsuario: credenciales.userType}).subscribe({
        next: (r: any) => {
          try {
            if (r && r.data) {
              const user: any = r.data;
              this.user = user;
              SessionService.usuario = this.user
              directed(user.tipoUsuario, this.router);
            } else {

            }
          } catch (error) {
            console.error('Error al procesar los datos:', error);
            console.log('Objeto recibido:', r);
          }
        },
        error: (e) => {
          console.error('Error en la llamada HTTP:', e);
          const errores = e.error?.errors || [];
        const mensajeErrores = errores.join(', ');
        this.sweetAlertService.mostrarError(mensajeErrores);
        }
      });

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









