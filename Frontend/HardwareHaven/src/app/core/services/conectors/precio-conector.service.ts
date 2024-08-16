import { Injectable } from '@angular/core';
import { PrecioService } from '../entities/precio.service';

@Injectable({
  providedIn: 'root'
})
export class PrecioConectorService {
  private precios: any[] =[]
  constructor(
    private serverPrecio: PrecioService
  ) { }

  
  public getAll() {
    this.serverPrecio.getAll().subscribe({
      next: (r: any) => {
        try {
          if (r && r.data && Array.isArray(r.data)) {
            const precios: any[] = r.data;
            this.precios = precios;
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
    return this.precios
  }

}
