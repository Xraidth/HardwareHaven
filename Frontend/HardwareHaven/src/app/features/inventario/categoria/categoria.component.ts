import { Component, Input, OnInit } from '@angular/core';
import { CategoriaService } from '../../../core/services/entities/categoria.service';
import { SweetAlertService } from '../../../core/services/notifications/sweet-alert.service';
import { capitalizeFirstLetterOfEachWord, specialFiltro } from '../share/inventario-functions';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-categoria',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './categoria.component.html',
  styleUrl: './categoria.component.css',
  providers: [CategoriaService, SweetAlertService]
})
export class CategoriaComponent implements OnInit {
  @Input() searchQuery: string| undefined;
  categorias: any[] = [];
  categoria: any = {};
  inventarioVacio = false;
  columns: string[] = [];
  columnsLw: string[] = [];
  isLoading = false;

  constructor(
    private serverCategoria: CategoriaService ,
    private sweetAlertService: SweetAlertService
  ) {}


  ngOnInit(): void {
    this.cargarEntidad();
  }

  cargarEntidad(): void {
    this.getAll();
  }

  cargarColumnas(): void {
    if (this.categorias.length > 0) {
      this.inventarioVacio = false;
      this.columnsLw = Object.keys(this.categorias[0]);
      this.columns = this.columnsLw.map(capitalizeFirstLetterOfEachWord);
      this.columns.push("Editar", "Eliminar");
    } else {
      this.columns = [];
      this.inventarioVacio = true;
    }
  }

  

  getAll(): void {
    this.isLoading = true; 
    this.serverCategoria.getAll().pipe(
      map((response: any) => response?.data || []),
      catchError((error) => {
        console.error('Error en la llamada HTTP:', error);
        return of([]);
      })
    ).subscribe((categorias: any[]) => {
      this.categorias = categorias;
      
      this.cargarColumnas();
      this.isLoading = false; 
    });
  }


  eliminarItem(categoria: any): void {
    this.delete(categoria.id);
    this.cargarEntidad();
  }

  editarItem(categoria: any): void {
    this.update(categoria);
    this.cargarEntidad();
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

  async update(categoria:any) {
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

  specialFiltro(nombre: string, dato: any): string {
    return specialFiltro(nombre,dato);
  }
}
