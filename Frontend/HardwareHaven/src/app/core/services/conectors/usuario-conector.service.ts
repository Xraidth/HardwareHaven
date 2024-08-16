import { Injectable } from '@angular/core';
import { UserService } from '../entities/user.service';
@Injectable({
  providedIn: 'root'
})
export class UsuarioConectorService {
  private usuarios: any[] = [];
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


}
