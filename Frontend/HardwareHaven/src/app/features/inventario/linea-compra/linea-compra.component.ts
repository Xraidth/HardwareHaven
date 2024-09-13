import { Component, Input, OnInit } from '@angular/core';
import { SweetAlertService } from '../../../core/services/notifications/sweet-alert.service';
import { LineaCompraService } from '../../../core/services/entities/linea-compra.service';
import { capitalizeFirstLetterOfEachWord, specialFiltro } from '../share/inventario-functions';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

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

  constructor(
    private serverLineaCompra: LineaCompraService,
    private sweetAlertService: SweetAlertService
  ) {}

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
    this.serverLineaCompra.getAll().subscribe({
      next: (r: any) => {
        try {
          if (r && r.data && Array.isArray(r.data)) {
            const lineas: any[] = r.data;
            this.lineas = lineas;
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
    return this.lineas
  }

  eliminarItem(linea: any): void {
    this.delete(linea.id);
    this.cargarEntidad();
  }

  editarItem(precio: any): void {
    this.update(precio);
    this.cargarEntidad();
  }

  delete(id:number) {
    this.serverLineaCompra.delete(id).subscribe({
      next: (r: any) => {
        try {
          if (r && r.data && Array.isArray(r.data)) {
            const linea: any = r.data;
            this.linea = linea;
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
    return this.linea
  }

  async InsertarLineaCompra() {
    const credenciales = await this.sweetAlertService.InsertLineaCompra();
    if (credenciales) {
      this.serverLineaCompra.create({
        compraId: credenciales.compraId,
        cantidad: credenciales.cantidad,
        componenteId: credenciales.componenteId
      }).subscribe({
        next: (r: any) => {
          try {
            if (r && r.data) {
              const lineaCompra: any = r.data; 
              this.linea = lineaCompra;
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


  async update(lineaCompra:any) {
    const credenciales = await this.sweetAlertService.updateLineaCompra(lineaCompra);
    if (credenciales) {
      this.serverLineaCompra.update(
        lineaCompra.id, 
        {
        compraId: credenciales.compraId,
        cantidad: credenciales.cantidad,
        subTotal: credenciales.subTotal,
        componenteId: credenciales.componenteId
      }
      ).subscribe({
        next: (r: any) => {
          try {
            if (r && r.data) {
              const lineaCompra: any = r.data; 
              this.linea = lineaCompra;
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
