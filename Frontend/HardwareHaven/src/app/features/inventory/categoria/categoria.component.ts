import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { CategoriaService } from '../../../core/services/entities/categoria.service';
import { SweetAlertService } from '../../../core/services/notifications/sweet-alert.service';
import { capitalizeFirstLetterOfEachWord, getErrorMessage, specialFiltro } from '../../../shared/functions/functions';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { of, Subscription } from 'rxjs';


@Component({
  selector: 'app-categoria',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './categoria.component.html',
  styleUrl: './categoria.component.css',
  providers: [CategoriaService, SweetAlertService]
})
export class CategoryComponent implements OnInit {
  @Input() searchQuery: string| undefined;
  categorias: any[] = [];
  categoria: any = {};
  inventarioVacio = false;
  columns: string[] = [];
  columnsLw: string[] = [];
  isLoading = false;
  originalCategorias: any[] = [];


  constructor(
    private serverCategoria: CategoriaService ,
    private sweetAlertService: SweetAlertService,

  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['searchQuery']) {
      const currentValue = changes['searchQuery'].currentValue;
      this.searchQuery = currentValue || '';

      if (this.searchQuery === '') {

        this.categorias = [...this.originalCategorias];
      } else {

        this.categorias = this.originalCategorias.filter(x =>
          x.descripcion.toLowerCase().includes(this.searchQuery?.toLowerCase())
        );
      }
    }
  }



  ngOnInit(): void {
    this.loadEntity();
  }


  loadEntity(): void {
    this.getAll();
  }

  loadColumns(): void {
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
        this.sweetAlertService.showError("Error to obtein categories")
        return of([]);
      })
    ).subscribe((categorias: any[]) => {
      this.categorias = categorias;

      this.originalCategorias = [...categorias];

      this.loadColumns();
      this.isLoading = false;
    });
  }


  eliminarItem(categoria: any): void {
    this.delete(categoria.id);
    this.loadEntity();
  }

  editarItem(categoria: any): void {
    this.update(categoria);
    this.loadEntity();
  }

  public delete(id: number) {
    this.sweetAlertService.confirmBox('¿Estás seguro?', 'No podrás revertir esta acción.').then((result) => {
      if (result.isConfirmed) {
        this.serverCategoria.delete(id).pipe(
          map((response: any) => {
            if (response && response.data) {
              return response.data;
            } else {
              return null;
            }
          }),
          catchError((error) => {
            this.isLoading = false;
            const errorMessage = getErrorMessage(error);
            this.sweetAlertService.showError(errorMessage);
            return of(null);
          })
        ).subscribe((categoria: any) => {
          if (categoria) {
            this.categoria = categoria;
            this.loadEntity();
          }
        });
      } else if (result.isDismissed) {
      }
    });
  }



  async insertarCategoria() {
    const credenciales = await this.sweetAlertService.InsertCategoria();
    if (credenciales) {
      this.serverCategoria.create({
        descripcion: credenciales.description
      }).pipe(
        map((response: any) => {
          if (response && response.data) {
            return response.data;
          } else {
            return null;
          }
        }),
        catchError((error) => {
          this.isLoading = false;
          const errorMessage = getErrorMessage(error);
          this.sweetAlertService.showError(errorMessage);
          return of(null);
        })
      ).subscribe({
        next: (categoria: any) => {
            if (categoria) {
                this.categoria = categoria;
                this.loadEntity();
            }
        },
        error: (e) => {
            const errores = e.error?.errors || [];
            const message = e.error?.message || [];
            const mensajeErrores = errores.join(', ');
            this.sweetAlertService.showError(mensajeErrores +", "+ message);
        }
    });

    }
  }


  async update(categoria: any) {
    const credenciales = await this.sweetAlertService.updateCategoria(categoria);
    if (credenciales) {
      this.serverCategoria.update(categoria.id, {
        descripcion: credenciales.description
      }).pipe(
        map((response: any) => {
          if (response && response.data) {
            return response.data;
          } else {
            return null;
          }
        }),
        catchError((error) => {
          this.isLoading = false;
          const errorMessage = getErrorMessage(error);
          this.sweetAlertService.showError(errorMessage);
          return of(null);
        })
      ).subscribe(
        {
        next:(categoria: any) => {
        if (categoria) {
          this.categoria = categoria;
          this.loadEntity();
        }
      },
      error: (e) => {
        const errores = e.error?.errors || [];
        const message = e.error?.message || [];
        const mensajeErrores = errores.join(', ');
        this.sweetAlertService.showError(mensajeErrores +", "+ message);
    }
      });
    }
  }



  specialFiltro(nombre: string, dato: any): string {
    return specialFiltro(nombre,dato);
  }
}
