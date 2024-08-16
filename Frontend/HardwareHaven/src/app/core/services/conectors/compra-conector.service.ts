import { Injectable } from '@angular/core';
import { CompraService } from '../entities/compra.service';

@Injectable({
  providedIn: 'root'
})
export class CompraConectorService {
  private compras:any[]=[];
  constructor(
    private serverCompra: CompraService
  ) { }

  public getAll() {
    this.serverCompra.getAll().subscribe({
      next: (r: any) => {
        try {
          if (r && r.data && Array.isArray(r.data)) {
            const compras: any[] = r.data;
            this.compras = compras;
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
    return this.compras
  }


}
