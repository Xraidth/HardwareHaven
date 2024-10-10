import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { CompraService } from '../../../core/services/entities/compra.service';
import { SweetAlertService } from '../../../core/services/notifications/sweet-alert.service';
import { capitalizeFirstLetterOfEachWord, getErrorMessage, specialFiltro } from '../../../shared/functions/functions';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-compra',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './compra.component.html',
  styleUrl: './compra.component.css',
  providers: [CompraService, SweetAlertService]
})
export class CompraComponent implements OnInit {
  @Input() searchQuery: string| undefined;
  compras: any[] = [];
  compra: any = {};
  inventarioVacio = false;
  columns: string[] = [];
  columnsLw: string[] = [];
  isLoading = false;
  originalcompras: any[] = [];

  constructor(
    private serverCompra: CompraService,
    private sweetAlertService: SweetAlertService
  ) {}


  ngOnChanges(changes: SimpleChanges) {
    if (changes['searchQuery']) {
      const currentValue = changes['searchQuery'].currentValue;
      this.searchQuery = currentValue || '';

      if (this.searchQuery === '') {

        this.compras = [...this.originalcompras];
      } else {

        this.compras = this.originalcompras.filter(x =>
          x.user.name.toLowerCase().includes(this.searchQuery?.toLowerCase())
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
    if (this.compras.length > 0) {
      this.inventarioVacio = false;
      this.columnsLw = Object.keys(this.compras[0]);
      this.columns = this.columnsLw.map(capitalizeFirstLetterOfEachWord);
      this.columns.push("Editar", "Eliminar");
    } else {
      this.columns = [];
      this.inventarioVacio = true;
    }
  }




  public getAll() {
    this.serverCompra.getAll().pipe(
      map((r: any) => {
        if (r && r.data && Array.isArray(r.data)) {
          return r.data;
        } else {
          console.log('El objeto recibido no tiene la estructura esperada.');
          return [];
        }
      }),
      catchError((error) => {
        this.isLoading = false;
        const errorMessage = getErrorMessage(error);
        this.sweetAlertService.mostrarError(errorMessage);
        return of([]);
      })
    ).subscribe({
      next: (compras: any[]) => {
        this.compras = compras;
        this.originalcompras = [...compras];
        this.cargarColumnas();
      }
    });
  }



  eliminarItem(linea: any): void {
    this.delete(linea.id);
    this.cargarEntidad();
  }

  editarItem(linea: any): void {
    this.update(linea);
    this.cargarEntidad();
  }


  public delete(id: number) {
    this.sweetAlertService.confirmBox('¿Estás seguro?', 'No podrás revertir esta acción.').then((result) => {
      if (result.isConfirmed) {
        this.serverCompra.delete(id).pipe(
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
        ).subscribe((compra: any) => {
          if (compra) {
            this.compra = compra;
            this.cargarEntidad();
          }
        });
      } else if (result.isDismissed) {
        console.log('El usuario canceló la eliminación.');
      }
    });
  }






  async InsertarCompra() {
    const credenciales = await this.sweetAlertService.InsertCompra();
    if (credenciales) {
      this.serverCompra.create({
        userId: credenciales.userId
      }).pipe(
        map((r: any) => {
          if (r && r.data) {
            return r.data;
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
      ).subscribe({
        next: (compra: any) => {
          if (compra) {
            this.compra = compra;
            this.cargarEntidad();
          }
        },
        error: (e) => {
          const errores = e.error?.errors || [];
          const mensajeErrores = errores.join(', ');
          this.sweetAlertService.mostrarError(mensajeErrores);
      }
      });
    }
  }



  async update(compra: any) {
    const credenciales = await this.sweetAlertService.updateCompra(compra);
    if (credenciales) {
      this.serverCompra.update(compra.id, {
        fechaCompra: credenciales.fechaCompra,
        fechaCancel: credenciales.fechaCancel,
        total: credenciales.total
      }).pipe(
        map((r: any) => {
          if (r && r.data) {
            return r.data;  // Return the updated compra
          } else {
            console.log('El objeto recibido no tiene la estructura esperada.');
            return null;
          }
        }),
        catchError((error) => {
          this.isLoading = false;
        const errorMessage = getErrorMessage(error);
        this.sweetAlertService.mostrarError(errorMessage);
          return of(null);  // Return null in case of error
        })
      ).subscribe({
        next: (compra: any) => {
          if (compra) {
            this.compra = compra;
            this.cargarEntidad();  // Reload entity after update
          }
        },
        error: (e) => {
          const errores = e.error?.errors || [];
          const mensajeErrores = errores.join(', ');
          this.sweetAlertService.mostrarError(mensajeErrores);
      }
      });
    }
  }


  specialFiltro(nombre: string, dato: any): string {
    return specialFiltro(nombre,dato);
  }

}
