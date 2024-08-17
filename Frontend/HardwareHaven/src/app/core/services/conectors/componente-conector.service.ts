import { Injectable } from '@angular/core';
import { ComponenteService } from '../entities/componente.service';

@Injectable({
  providedIn: 'root'
})
export class ComponenteConectorService {
  private componentes:any[]=[];
  private componente:any;
  constructor(
    private serverComponente: ComponenteService
  ) { }
  
  public getAll() {
    this.serverComponente.getAll().subscribe({
      next: (r: any) => {
        try {
          if (r && r.data && Array.isArray(r.data)) {
            const componentes: any[] = r.data;
            this.componentes = componentes;
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
    return this.componentes
  }

  public delete(id:number) {
    this.serverComponente.delete(id).subscribe({
      next: (r: any) => {
        try {
          if (r && r.data && Array.isArray(r.data)) {
            const componente: any = r.data;
            this.componente = componente;
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
    return this.componente
  }

  public update(id:number,
    newCompName: string,
    newDescription: string,
    categoriaId: number
  ) {
    this.serverComponente.update(id,{newCompName, newDescription, categoriaId}
    ).subscribe({
      next: (r: any) => {
        try {
          if (r && r.data && Array.isArray(r.data)) {
            const componente: any = r.data;
            this.componente = componente;
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
    return this.componente
  }

}
