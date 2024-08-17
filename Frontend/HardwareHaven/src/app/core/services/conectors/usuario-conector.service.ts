import { Injectable } from '@angular/core';
import { UserService } from '../entities/user.service';
@Injectable({
  providedIn: 'root'
})
export class UsuarioConectorService {
  private usuarios: any[] = [];
  private usuario: any = [];
  constructor(
    private serverUser: UserService, 
  
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

  public update( 
    id: number,
    newPassword: string,
    oldPassword: string,
    newUserName: string,
    newEmail: string,
  ) {
    this.serverUser.update(id, 
      {
    newPassword,
    oldPassword,
    newUserName,
    newEmail
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


}
