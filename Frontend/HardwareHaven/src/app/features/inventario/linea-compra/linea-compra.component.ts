import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { SweetAlertService } from '../../../core/services/notifications/sweet-alert.service';
import { LineaCompraService } from '../../../core/services/entities/linea-compra.service';
import { capitalizeFirstLetterOfEachWord, getErrorMessage, specialFiltro } from '../share/inventario-functions';
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
  providers: [LineaCompraService, SweetAlertService]
})
export class LineaCompraComponent  implements OnInit {
  @Input() searchQuery: string| undefined;
  lineas: any[]=[];
  linea: any;
  columns: string[] = [];
  columnsLw: string[] = [];
  inventarioVacio = false;
  isLoading = false;
  originallineas: any[] = [];
  

  constructor(
    private serverLineaCompra: LineaCompraService,
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
    this.cargarEntidad();
  }

  cargarEntidad(): void {
    this.getAll();
  }


  cargarColumnas(): void {
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
          return r.data;  // Returning the lineas array
        } else {
          console.log('El objeto recibido no tiene la estructura esperada.');
          return [];
        }
      }),
      catchError((error) => {
        this.isLoading = false;
        const errorMessage = getErrorMessage(error);
        this.sweetAlertService.mostrarError(errorMessage); 
        return of([]);  // Return an empty array if there's an error
      })
    ).subscribe({
      next: (lineas: any[]) => {
        this.lineas = lineas;
        this.originallineas = [...lineas];
        this.cargarColumnas();  
        this.isLoading = false;
      }
    });
  }
  


  eliminarItem(linea: any): void {
    this.delete(linea.id);
    this.cargarEntidad();
  }

  editarItem(precio: any): void {
    this.update(precio);
    this.cargarEntidad();
  }

  public delete(id: number) {
    this.sweetAlertService.confirmBox('¿Estás seguro?', 'No podrás revertir esta acción.').then((result) => {
      if (result.isConfirmed) {
        this.serverLineaCompra.delete(id).pipe(
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
        ).subscribe((linea: any) => {
          if (linea) {
            this.linea = linea;
            this.cargarEntidad();  
          }
        });
      } else if (result.isDismissed) {
        console.log('El usuario canceló la eliminación.');
      }
    });
  }
  

  async InsertarLineaCompra() {
    const credenciales = await this.sweetAlertService.InsertLineaCompra();
    if (credenciales) {
      this.serverLineaCompra.create({
        compraId: credenciales.compraId,
        cantidad: credenciales.cantidad,
        componenteId: credenciales.componenteId
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
        next: (lineaCompra: any) => {
          if (lineaCompra) {
            this.linea = lineaCompra;
            this.cargarEntidad();  // Reload entity after insertion
          }
        }
      });
    }
  }
  


  async update(lineaCompra: any) {
    const credenciales = await this.sweetAlertService.updateLineaCompra(lineaCompra);
    if (credenciales) {
      this.serverLineaCompra.update(lineaCompra.id, {
        compraId: credenciales.compraId,
        cantidad: credenciales.cantidad,
        subTotal: credenciales.subTotal,
        componenteId: credenciales.componenteId
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
        next: (lineaCompra: any) => {
          if (lineaCompra) {
            this.linea = lineaCompra;
            this.cargarEntidad();  
          }
        }
      });
    }
  }
  

  specialFiltro(nombre: string, dato: any): string {
    return specialFiltro(nombre,dato);
  }



}
