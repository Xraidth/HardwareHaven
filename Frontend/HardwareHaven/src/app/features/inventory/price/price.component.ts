import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PriceService } from '../../../core/services/entities/price.service';
import { SweetAlertService } from '../../../core/services/notifications/sweet-alert.service';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { capitalizeFirstLetterOfEachWord, getErrorMessage, specialFilter } from '../../../shared/functions/functions';

@Component({
  selector: 'app-price',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './price.component.html',
  styleUrl: './price.component.css',
  providers: [PriceService, SweetAlertService]
})
export class PriceComponent implements OnInit {
  @Input() searchQuery: string| undefined;
  precios: any[] = [];
  precio: any = {};
  inventarioVacio = false;
  columns: string[] = [];
  columnsLw: string[] = [];
  isLoading = false;
  originalprecios: any[] = [];

  constructor(
    private serverPrecio: PriceService,
    private sweetAlertService: SweetAlertService
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['searchQuery']) {
      const currentValue = changes['searchQuery'].currentValue;
      this.searchQuery = currentValue || '';

      if (this.searchQuery === '') {

        this.precios = [...this.originalprecios];
      } else {

        this.precios = this.originalprecios.filter(x =>
          x.componente.name.toLowerCase().includes(this.searchQuery?.toLowerCase())
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
    if (this.precios.length > 0) {
      this.inventarioVacio = false;
      this.columnsLw = Object.keys(this.precios[0]);
      this.columns = this.columnsLw.map(capitalizeFirstLetterOfEachWord);
      this.columns.push("Editar", "Eliminar");
    } else {
      this.columns = [];
      this.inventarioVacio = true;
    }
  }



  getAll(): void {
    this.isLoading = true;
    this.serverPrecio.getAll().pipe(
      map((response: any) => response?.data || []),
      catchError((error) => {
        this.isLoading = false;
        const errorMessage = getErrorMessage(error);
        this.sweetAlertService.showError(errorMessage);
        this.isLoading = false;
        return of([]);
      })
    ).subscribe((precios: any[]) => {
      this.precios = precios;
      this.originalprecios = [...precios];
      this.loadColumns();
      this.isLoading = false;
    });
  }

  eliminarItem(precio: any): void {
    this.delete(precio.id);
    this.loadEntity();
  }

  editarItem(precio: any): void {
    this.update(precio);
    this.loadEntity();
  }

  public delete(id: number) {
    this.sweetAlertService.confirmBox('¿Estás seguro?', 'No podrás revertir esta acción.').then((result) => {
      if (result.isConfirmed) {
        this.serverPrecio.delete(id).pipe(
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
        ).subscribe((precio: any) => {
          if (precio) {
            this.precio = precio;
            this.loadEntity();
          }
        });
      } else if (result.isDismissed) {

      }
    });
  }

  async insert(): Promise<void> {
    const credenciales = await this.sweetAlertService.InsertPrecio();
    if (credenciales) {
      this.serverPrecio.create({
        fechaDesde: credenciales.fechaDesde,
        componenteId: Number(credenciales.componenteId),
        valor: Number(credenciales.valor)
      }).pipe(
        catchError((error) => {
          this.isLoading = false;
        const errorMessage = getErrorMessage(error);
        this.sweetAlertService.showError(errorMessage);
          return of(null);
        })
      ).subscribe(
        {
        next:
        (response: any) => {
        if (response?.data) {
          this.precios.push(response.data);
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

  async update(precio: any): Promise<void> {
    const credenciales = await this.sweetAlertService.updatePrecio(precio);
    if (credenciales) {
      this.serverPrecio.update(precio.id, {
        fechaDesde: credenciales.fechaDesde,
        componenteId: Number(credenciales.componenteId),
        valor: Number(credenciales.valor)
      }).pipe(
        catchError((error) => {
          this.isLoading = false;
          const errores = error.error?.errors || [];
          const message = error?.error.message || [];
          const mensajeErrores = errores.join(', ');
          this.sweetAlertService.showError(mensajeErrores +", "+ message);
          return of(null);
        })
      ).subscribe(
       {next:
        (response: any) => {
        if (response?.data) {
          this.precios = this.precios.map(p => p.id === precio.id ? response.data : p);
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

  formatDateTime(isoString: string): string {
    const date = new Date(isoString);
    return date.toLocaleString('es-ES', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  }

  specialFilter(nombre: string, dato: any): string {
    return specialFilter(nombre,dato);
  }
}
