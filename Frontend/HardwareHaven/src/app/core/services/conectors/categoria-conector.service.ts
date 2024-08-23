import { Injectable } from '@angular/core';
import { CategoriaService } from '../entities/categoria.service';
import { SweetAlertService } from '../notifications/sweet-alert.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriaConectorService {
  private categorias:any[]=[];
  private categoria:any;
  constructor(
    private serverCategoria: CategoriaService,
    private sweetAlertService: SweetAlertService
  ) { }

  public getAll() {
    this.serverCategoria.getAll().subscribe({
      next: (r: any) => {
        try {
          if (r && r.data && Array.isArray(r.data)) {
            const categorias: any[] = r.data;
            this.categorias = categorias;
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
    return this.categorias
  }


  public delete(id:number) {
    this.serverCategoria.delete(id).subscribe({
      next: (r: any) => {
        try {
          if (r && r.data && Array.isArray(r.data)) {
            const categoria: any = r.data;
            this.categoria = categoria;
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
    return this.categoria
  }

  async updateCategoria(categoria:any) {
    const credenciales = await this.sweetAlertService.updateCategoria(categoria);
    if (credenciales) {
      this.serverCategoria.update(categoria.id,{
        descripcion: credenciales.description
      }).subscribe({
        next: (r: any) => {
          try {
            if (r && r.data) {
              const categoria: any = r.data; 
              this.categoria = categoria;
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



  
  async InsertarCategoria() {
    const credenciales = await this.sweetAlertService.InsertCategoria();
    if (credenciales) {
      this.serverCategoria.create({
        descripcion: credenciales.description
      }).subscribe({
        next: (r: any) => {
          try {
            if (r && r.data) {
              const categoria: any = r.data; 
              this.categoria = categoria;
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
