import { Injectable } from '@angular/core';
import { CategoriaService } from '../entities/categoria.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriaConectorService {
  private categorias:any[]=[];
  constructor(
    private serverCategoria: CategoriaService
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

}
