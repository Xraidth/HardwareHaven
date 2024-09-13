import { Component, Input, OnInit } from '@angular/core';
import { CompraService } from '../../../core/services/entities/compra.service';
import { SweetAlertService } from '../../../core/services/notifications/sweet-alert.service';
import { capitalizeFirstLetterOfEachWord, specialFiltro } from '../share/inventario-functions';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

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

  constructor(
    private serverCompra: CompraService,
    private sweetAlertService: SweetAlertService
  ) {}

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
    this.serverCompra.getAll().subscribe({
      next: (r: any) => {
        try {
          if (r && r.data && Array.isArray(r.data)) {
            const compras: any[] = r.data;
            this.compras = compras;
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
    return this.compras
  }


  eliminarItem(linea: any): void {
    this.delete(linea.id);
    this.cargarEntidad();
  }

  editarItem(linea: any): void {
    this.update(linea);
    this.cargarEntidad();
  }


  public delete(id:number) {
    this.serverCompra.delete(id).subscribe({
      next: (r: any) => {
        try {
          if (r && r.data && Array.isArray(r.data)) {
            const compra: any = r.data;
            this.compra = compra;
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
    return this.compra
  }

 



  async InsertarCompra() {
    const credenciales = await this.sweetAlertService.InsertCompra();
    if (credenciales) {
      this.serverCompra.create({
        userId: credenciales.userId
      }).subscribe({
        next: (r: any) => {
          try {
            if (r && r.data) {
              const compra: any = r.data; 
              this.compra = compra;
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


  async update(compra:any) {
    const credenciales = await this.sweetAlertService.updateCompra(compra);
    if (credenciales) {
      this.serverCompra.update(
        compra.id, 
        {
        fechaCompra: credenciales.fechaCompra ,
        fechaCancel: credenciales.fechaCancel,
        total: credenciales.total}
      ).subscribe({
        next: (r: any) => {
          try {
            if (r && r.data) {
              const compra: any = r.data; 
              this.compra = compra;
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
