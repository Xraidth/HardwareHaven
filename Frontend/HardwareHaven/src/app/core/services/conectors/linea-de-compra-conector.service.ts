import { Injectable } from '@angular/core';
import { LineaCompraService } from '../entities/linea-compra.service';

@Injectable({
  providedIn: 'root'
})
export class LineaDeCompraConectorService {
  private lineas: any[]=[];
  private linea: any;
  constructor(
    private serverLineaCompra: LineaCompraService
  ) { }


  
  public getAll() {
    this.serverLineaCompra.getAll().subscribe({
      next: (r: any) => {
        try {
          if (r && r.data && Array.isArray(r.data)) {
            const lineas: any[] = r.data;
            this.lineas = lineas;
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
    return this.lineas
  }

  public delete(id:number) {
    this.serverLineaCompra.delete(id).subscribe({
      next: (r: any) => {
        try {
          if (r && r.data && Array.isArray(r.data)) {
            const linea: any = r.data;
            this.linea = linea;
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
    return this.linea
  }


  public update(id:number, 
    compraId: number,
    cantidad: number,
    subTotal: number,
    componenteId: number
  ) {
    this.serverLineaCompra.update(id,{
      compraId,
      cantidad,
      subTotal,
      componenteId
      }).subscribe({
      next: (r: any) => {
        try {
          if (r && r.data && Array.isArray(r.data)) {
            const linea: any = r.data;
            this.linea = linea;
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
    return this.linea
  }

}
