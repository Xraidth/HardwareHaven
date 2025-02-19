import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { SweetAlertService } from '../../../core/services/notifications/sweet-alert.service';
import { PurchaseLineService } from '../../../core/services/entities/linea-compra.service';
import { capitalizeFirstLetterOfEachWord, getErrorMessage, specialFilter } from '../../../shared/functions/functions';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-linea-compra',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './linea-compra.component.html',
  styleUrl: './linea-compra.component.css',
  providers: [PurchaseLineService, SweetAlertService]
})
export class PurchaseLineComponent  implements OnInit {
  @Input() searchQuery: string| undefined;
  lineas: any[]=[];
  linea: any;
  columns: string[] = [];
  columnsLw: string[] = [];
  inventarioVacio = false;
  isLoading = false;
  originallineas: any[] = [];


  constructor(
    private serverLineaCompra: PurchaseLineService,
    private sweetAlertService: SweetAlertService
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['searchQuery']) {
      const currentValue = changes['searchQuery'].currentValue;
      this.searchQuery = currentValue || '';

      if (this.searchQuery === '') {

        this.lineas = [...this.originallineas];
      } else {

        this.lineas = this.originallineas.filter(x =>
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
    if (this.lineas.length > 0) {
      this.inventarioVacio = false;
      this.columnsLw = Object.keys(this.lineas[0]);
      this.columns = this.columnsLw.map(capitalizeFirstLetterOfEachWord);
      this.columns.push("Editar", "Eliminar");
    } else {
      this.columns = [];
      this.inventarioVacio = true;
    }
  }

  getAll() {
    this.isLoading = true;
    this.serverLineaCompra.getAll().pipe(
      map((r: any) => {
        if (r && r.data && Array.isArray(r.data)) {
          return r.data;
        } else {

          return [];
        }
      }),
      catchError((error) => {
        this.isLoading = false;
        const errorMessage = getErrorMessage(error);
        this.sweetAlertService.showError(errorMessage);
        return of([]);
      })
    ).subscribe({
      next: (lineas: any[]) => {
        this.lineas = lineas;
        this.originallineas = [...lineas];
        this.loadColumns();
        this.isLoading = false;
      }
    });
  }



  eliminarItem(linea: any): void {
    this.delete(linea.id);
    this.loadEntity();
  }

  editarItem(precio: any): void {
    this.update(precio);
    this.loadEntity();
  }

  public delete(id: number) {
    this.sweetAlertService.confirmBox('¿Estás seguro?', 'No podrás revertir esta acción.').then((result) => {
      if (result.isConfirmed) {
        this.serverLineaCompra.delete(id).pipe(
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
        ).subscribe((linea: any) => {
          if (linea) {
            this.linea = linea;
            this.loadEntity();
          }
        });
      } else if (result.isDismissed) {

      }
    });
  }


  async InsertarLineaCompra() {
    const credenciales = await this.sweetAlertService.InsertLineaCompra();
    if (credenciales) {
      this.serverLineaCompra.create({
        compraId: Number(credenciales.compraId),
        cantidad: Number(credenciales.cantidad),
        componenteId: Number(credenciales.componenteId)
      }).pipe(
        map((r: any) => {
          if (r && r.data) {
            return r.data;
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
        next: (lineaCompra: any) => {
          if (lineaCompra) {
            this.linea = lineaCompra;
            this.loadEntity();  // Reload entity after insertion
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



  async update(lineaCompra: any) {
    const credenciales = await this.sweetAlertService.updateLineaCompra(lineaCompra);
    if (credenciales) {
      this.serverLineaCompra.update(lineaCompra.id, {
        compraId: Number(credenciales.compraId),
        cantidad: Number(credenciales.cantidad),
        subTotal: Number(credenciales.subTotal),
        componenteId: Number(credenciales.componenteId)
      }).pipe(
        map((r: any) => {
          if (r && r.data) {
            return r.data;
          } else {

            return null;
          }
        }),
        catchError((error) => {
          this.isLoading = false;
          const errores = error.error?.errors || [];
          const message = error.error.message || [];
          const mensajeErrores = errores.join(', ');
          this.sweetAlertService.showError(mensajeErrores +", "+ message);
          return of(null);
        })
      ).subscribe({
        next: (lineaCompra: any) => {
          if (lineaCompra) {
            this.linea = lineaCompra;
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


  specialFilter(nombre: string, dato: any): string {
    return specialFilter(nombre,dato);
  }



}
