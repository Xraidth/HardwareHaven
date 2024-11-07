import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ComponenteService } from '../../../core/services/entities/componente.service';
import { SweetAlertService } from '../../../core/services/notifications/sweet-alert.service';
import { capitalizeFirstLetterOfEachWord, getErrorMessage, specialFiltro } from '../../../shared/functions/functions';
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
  originalcomponentes: any[] = [];

  isLoading = false;
  constructor(
    private serverComponente: ComponenteService ,
    private sweetAlertService: SweetAlertService
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['searchQuery']) {
      const currentValue = changes['searchQuery'].currentValue;
      this.searchQuery = currentValue || '';

      if (this.searchQuery === '') {

        this.componentes = [...this.originalcomponentes];
      } else {

        this.componentes = this.originalcomponentes.filter(x =>
          x.name.toLowerCase().includes(this.searchQuery?.toLowerCase())
        );
      }
    }
  }

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
        this.isLoading = false;
        const errorMessage = getErrorMessage(error);
        this.sweetAlertService.mostrarError(errorMessage);
        return of([]);
      })
    ).subscribe(
      (componentes: any[]) => {
      this.componentes = componentes;
      this.originalcomponentes = [...componentes];
      this.cargarColumnas();  // Load columns after fetching data
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


  public delete(id: number) {
    this.sweetAlertService.confirmBox('¿Estás seguro?', 'No podrás revertir esta acción.').then((result) => {
      if (result.isConfirmed) {
        this.serverComponente.delete(id).pipe(
          map((response: any) => {
            if (response && response.data) {
              return response.data;
            } else {
              console.log('El objeto recibido no tiene la estructura esperada.');
              return null;
            }
          }),
          catchError((error) => {
            this.isLoading = false;
            const errorMessage = getErrorMessage(error);
            this.sweetAlertService.mostrarError(errorMessage);
            return of(null);
          })
        ).subscribe((componente: any) => {
          if (componente) {
            this.componente = componente;
            this.cargarEntidad();
          }
        });
      } else if (result.isDismissed) {
        console.log('El usuario canceló la eliminación.');
      }
    });
  }



  async InsertarComponente() {
    const credenciales = await this.sweetAlertService.InsertComponente();
    if (credenciales) {
      this.serverComponente.create({
        name: credenciales.name,
        description: credenciales.description,
        categoriaId: Number(credenciales.categoriaId)
      }).pipe(
        map((response: any) => {
          if (response && response.data) {
            return response.data;
          } else {
            console.log('El objeto recibido no tiene la estructura esperada.');
            return null;
          }
        }),
        catchError((error) => {
          this.isLoading = false;
        const errorMessage = getErrorMessage(error);
        this.sweetAlertService.mostrarError(errorMessage);
          return of(null);
        })
      ).subscribe(
       { next: (componente: any) => {
        if (componente) {
          this.componente = componente;
          this.cargarEntidad();
        }
      },
      error: (e) => {
        const errores = e.error?.errors || [];
const message = e.error?.message || [];
        const mensajeErrores = errores.join(', ');
        this.sweetAlertService.mostrarError(mensajeErrores +", "+ message);
    }
      });
    }
  }


  async update(componente: any) {
    const credenciales = await this.sweetAlertService.updateComponente(componente);
    if (credenciales) {
      this.serverComponente.update(componente.id, {
        newCompName: credenciales.name,
        newDescription: credenciales.description,
        categoriaId: Number(credenciales.categoriaId)
      }).pipe(
        map((response: any) => {
          if (response && response.data) {
            return response.data;  // Return the updated componente
          } else {
            console.log('El objeto recibido no tiene la estructura esperada.');
            return null;
          }
        }),
        catchError((error) => {
          this.isLoading = false;
          const errorMessage = getErrorMessage(error);
          this.sweetAlertService.mostrarError(errorMessage);
          return of(null);
        })
      ).subscribe(
            {
              next:
          (componente: any) => {
        if (componente) {
          this.componente = componente;
          this.cargarEntidad(); }
        },
        error: (e) => {
          const errores = e.error?.errors || [];
const message = e.error?.message || [];
          const mensajeErrores = errores.join(', ');
          this.sweetAlertService.mostrarError(mensajeErrores +", "+ message);
      }
      });
    }
  }


  specialFiltro(nombre: string, dato: any): string {
    return specialFiltro(nombre,dato);
  }
}
