import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PrecioService } from '../../../core/services/entities/precio.service';
import { SweetAlertService } from '../../../core/services/notifications/sweet-alert.service';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { capitalizeFirstLetterOfEachWord, specialFiltro } from '../share/inventario-functions';

@Component({
  selector: 'app-precio',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './precio.component.html',
  styleUrl: './precio.component.css',
  providers: [PrecioService, SweetAlertService]
})
export class PrecioComponent implements OnInit {
  precios: any[] = [];
  precio: any = {};
  inventarioVacio = false;
  columns: string[] = [];
  columnsLw: string[] = [];
  isLoading = false;

  constructor(
    private serverPrecio: PrecioService,
    private sweetAlertService: SweetAlertService
  ) {}

  ngOnInit(): void {
    this.cargarEntidad();
  }

  cargarEntidad(): void {
    this.getAllPrecios();
  }

  cargarColumnas(): void {
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

  

  getAllPrecios(): void {
    this.isLoading = true;
    this.serverPrecio.getAll().pipe(
      map((response: any) => response?.data || []),
      catchError((error) => {
        console.error('Error en la llamada HTTP:', error);
        this.isLoading = false;
        return of([]);
      })
    ).subscribe((precios: any[]) => {
      this.precios = precios;
      this.cargarColumnas();
      this.isLoading = false;
    });
  }

  eliminarItem(precio: any): void {
    this.deletePrecio(precio.id);
    this.cargarEntidad();
  }

  editarItem(precio: any): void {
    this.updatePrecio(precio);
    this.cargarEntidad();
  }

  deletePrecio(id: number): void {
    this.serverPrecio.delete(id).pipe(
      catchError((error) => {
        console.error('Error al eliminar precio:', error);
        return of(null);
      })
    ).subscribe((response: any) => {
      if (response?.data) {
        this.precios = this.precios.filter(p => p.id !== id);
      }
    });
  }

  async insertPrecio(): Promise<void> {
    const credenciales = await this.sweetAlertService.InsertPrecio();
    if (credenciales) {
      this.serverPrecio.create({
        fechaDesde: credenciales.fechaDesde,
        componenteId: credenciales.componenteId,
        valor: credenciales.valor
      }).pipe(
        catchError((error) => {
          console.error('Error al registrar precio:', error);
          return of(null);
        })
      ).subscribe((response: any) => {
        if (response?.data) {
          this.precios.push(response.data);
        }
      });
    }
  }

  async updatePrecio(precio: any): Promise<void> {
    const credenciales = await this.sweetAlertService.updatePrecio(precio);
    if (credenciales) {
      this.serverPrecio.update(precio.id, {
        fechaDesde: credenciales.fechaDesde,
        componenteId: credenciales.componenteId,
        valor: credenciales.valor
      }).pipe(
        catchError((error) => {
          console.error('Error al actualizar precio:', error);
          return of(null);
        })
      ).subscribe((response: any) => {
        if (response?.data) {
          this.precios = this.precios.map(p => p.id === precio.id ? response.data : p);
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

  specialFiltro(nombre: string, dato: any): string {
    return specialFiltro(nombre,dato);
  }
}
