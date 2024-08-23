import { Injectable } from '@angular/core';
import { PrecioService } from '../entities/precio.service';
import { SweetAlertService } from '../notifications/sweet-alert.service';

@Injectable({
  providedIn: 'root'
})
export class PrecioConectorService {
  private precios: any[] =[];
  private precio: any;
  constructor(
    private serverPrecio: PrecioService,
    private sweetAlertService: SweetAlertService
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


  public delete(id:number) {
    this.serverPrecio.delete(id).subscribe({
      next: (r: any) => {
        try {
          if (r && r.data && Array.isArray(r.data)) {
            const precio: any = r.data;
            this.precio = precio;
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
    return this.precio
  }

  public update(
    id:number,
    fechaDesde: Date, 
    componenteId: number,
    valor: number 
  ) {
    this.serverPrecio.update(id,
      {fechaDesde, 
      componenteId,
      valor}).subscribe({
      next: (r: any) => {
        try {
          if (r && r.data && Array.isArray(r.data)) {
            const precio: any = r.data;
            this.precio = precio;
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
    return this.precio
  }



  async InsertarPrecio() {
    const credenciales = await this.sweetAlertService.InsertPrecio();
    if (credenciales) {
      this.serverPrecio.create({
        fechaDesde: credenciales.fechaDesde,
        componenteId: credenciales.componenteId,
        valor: credenciales.valor
      }).subscribe({
        next: (r: any) => {
          try {
            if (r && r.data) {
              const precio: any = r.data; 
              this.precio = precio;
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


  async updatePrecio(precio:any) {
    const credenciales = await this.sweetAlertService.updatePrecio(precio);
    if (credenciales) {
      this.serverPrecio.update(precio.id,{
        fechaDesde: credenciales.fechaDesde,
        componenteId: credenciales.componenteId,
        valor: credenciales.valor
      }).subscribe({
        next: (r: any) => {
          try {
            if (r && r.data) {
              const precio: any = r.data; 
              this.precio = precio;
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
