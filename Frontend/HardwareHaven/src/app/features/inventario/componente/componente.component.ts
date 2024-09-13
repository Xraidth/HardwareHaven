import { Component, Input, OnInit } from '@angular/core';
import { ComponenteService } from '../../../core/services/entities/componente.service';
import { SweetAlertService } from '../../../core/services/notifications/sweet-alert.service';
import { capitalizeFirstLetterOfEachWord, specialFiltro } from '../share/inventario-functions';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-componente',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './componente.component.html',
  styleUrl: './componente.component.css',
  providers: [ComponenteService, SweetAlertService]
})
export class ComponenteComponent implements OnInit{
  @Input() searchQuery: string| undefined;
  componentes: any[] = [];
  componente: any = {};
  inventarioVacio = false;
  columns: string[] = [];
  columnsLw: string[] = [];
  isLoading = false;
  constructor(
    private serverComponente: ComponenteService ,
    private sweetAlertService: SweetAlertService
  ) {}


  ngOnInit(): void {
    this.cargarEntidad();
  }

  cargarEntidad(): void {
    this.getAll();
  }

  
  cargarColumnas(): void {
    if (this.componentes.length > 0) {
      this.inventarioVacio = false;
      this.columnsLw = Object.keys(this.componentes[0]);
      this.columns = this.columnsLw.map(capitalizeFirstLetterOfEachWord);
      this.columns.push("Editar", "Eliminar");
    } else {
      this.columns = [];
      this.inventarioVacio = true;
    }
  }


  getAll(): void {
    this.isLoading = true; 
    this.serverComponente.getAll().pipe(
      map((response: any) => response?.data || []),
      catchError((error) => {
        console.error('Error en la llamada HTTP:', error);
        return of([]);
      })
    ).subscribe((componentes: any[]) => {
      this.componentes = componentes;
      
      this.cargarColumnas();
      this.isLoading = false; 
    });
  }

  eliminarItem(componente: any): void {
    this.delete(componente.id);
    this.cargarEntidad();
  }

  editarItem(componente: any): void {
    this.update(componente);
    this.cargarEntidad();
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



  async InsertarComponente() {
    const credenciales = await this.sweetAlertService.InsertComponente();
    if (credenciales) {
      this.serverComponente.create({
        name: credenciales.name,
        description: credenciales.description,
        categoriaId: credenciales.categoriaId
      }).subscribe({
        next: (r: any) => {
          try {
            if (r && r.data) {
              const componente: any = r.data; 
              this.componente = componente;
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

  async update(componente:any) {
    const credenciales = await this.sweetAlertService.updateComponente(componente);
    if (credenciales) {
      this.serverComponente.update(
        componente.id, 
        {
          newCompName: credenciales.name,
          newDescription: credenciales.description,
          categoriaId: credenciales.categoriaId
      }).subscribe({
        next: (r: any) => {
          try {
            if (r && r.data) {
              const componente: any = r.data; 
              this.componente = componente;
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

  specialFiltro(nombre: string, dato: any): string {
    return specialFiltro(nombre,dato);
  }
}
