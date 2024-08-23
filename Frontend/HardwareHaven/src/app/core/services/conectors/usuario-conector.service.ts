import { Injectable } from '@angular/core';
import { UserService } from '../entities/user.service';
import { SweetAlertService } from '../notifications/sweet-alert.service';
@Injectable({
  providedIn: 'root'
})
export class UsuarioConectorService {
  private usuarios: any[] = [];
  private usuario: any = [];
  constructor(
    private serverUser: UserService,
    private sweetAlertService:SweetAlertService 
  
  ) { }


  public getAll() {
    this.serverUser.getAll().subscribe({
      next: (r: any) => {
        try {
          if (r && r.data && Array.isArray(r.data)) {
            const usuarios: any[] = r.data;
            this.usuarios = usuarios;
          } else {
            console.log('El objeto recibido no tiene la estructura esperada.');
          }
        } catch (error) {
          console.error('Error al procesar los datos:', error);
          console.log('Objeto recibido:', r);
        }
      },
      error: (e) => {
        console.error('Error en la llamada HTTP:', e);
      }
    });
    return this.usuarios
  }

  public delete(id:number) {
    this.serverUser.delete(id).subscribe({
      next: (r: any) => {
        try {
          if (r && r.data && Array.isArray(r.data)) {
            const usuario: any = r.data;
            this.usuario = usuario;
          } else {
            console.log('El objeto recibido no tiene la estructura esperada.');
          }
        } catch (error) {
          console.error('Error al procesar los datos:', error);
          console.log('Objeto recibido:', r);
        }
      },
      error: (e) => {
        console.error('Error en la llamada HTTP:', e);
      }
    });
    return this.usuario
  }

  async update(user:any) {
    const credenciales = await this.sweetAlertService.mostrarConfigurarCuenta(user);
    if (credenciales) {
    this.serverUser.update(
      user.id, 
      {
        newPassword: credenciales.newPassword,
        oldPassword: credenciales.oldPassword,
        newUserName: credenciales.newUserName,
        newEmail: credenciales.newEmail
    ,
    }
    ).subscribe({
      next: (r: any) => {
        try {
          if (r && r.data && Array.isArray(r.data)) {
            const usuario: any = r.data;
            this.usuario = usuario;
          } else {
            console.log('El objeto recibido no tiene la estructura esperada.');
          }
        } catch (error) {
          console.error('Error al procesar los datos:', error);
          console.log('Objeto recibido:', r);
        }
      },
      error: (e) => {
        console.error('Error en la llamada HTTP:', e);
      }
    });
  
    return this.usuario
  }
  else return null
  }



  async registrarUsuario() {
    const credenciales = await this.sweetAlertService.mostrarFormularioRegistro();
    if (credenciales) {
      this.serverUser.create({name:credenciales.username, password:credenciales.password, email:credenciales.email}).subscribe({
        next: (r: any) => {
          try {
            if (r && r.data) {
              const user: any = r.data; 
              this.usuario = user;
            } else {
              
            }
          } catch (error) {
            console.error('Error al procesar los datos:', error);
            console.log('Objeto recibido:', r); 
          }
        },
        error: (e) => {
          console.error('Error en la llamada HTTP:', e);
        }
      });
      
    }
    
  }


  


}
