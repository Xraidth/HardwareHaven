import { Component, NgModule, OnInit } from '@angular/core';
import { SessionService } from '../../../../core/services/share/session.service';
import { CompraService } from '../../../../core/services/entities/compra.service';
import { LineaCompraService } from '../../../../core/services/entities/linea-compra.service';

import { SweetAlertService } from '../../../../core/services/notifications/sweet-alert.service';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule ,  NgIf} from '@angular/common';
import { formatDateToYYYYMMDD } from '../../../../shared/functions/functions';

@Component({
  selector: 'app-resumen-compra',
  standalone: true,
  imports: [CommonModule,HttpClientModule, FormsModule],
  templateUrl: './resumen-compra.component.html',
  styleUrls: ['./resumen-compra.component.css'],
  providers: [CompraService, LineaCompraService]
})
export class ResumenCompraComponent implements OnInit {
  public usuario: any;
  public carrito: any;
  public compra: any;
  public compraRealizada: any;
  public lineasCompra: any[] = [];
  public total: any;
  public estado: string = "";
  constructor(
    private serverCompra: CompraService,
    private serverLineaCompra: LineaCompraService,
    private sweetAlertService: SweetAlertService
  ) {}

  ngOnInit(): void {

    this.usuario = SessionService.usuario; 
    if (this.usuario && this.usuario.carrito) {
      this.carrito = this.usuario.carrito;
      this.generarCompra();}
    else{
      this.sweetAlertService.mostrarError('No se encontró información del usuario o del carrito');
      return;
    }
    
    
    
  }

  generarCompra() {
    this.estado= "cargando";
    this.serverCompra.create({ userId: this.usuario.id }).subscribe({
      next: (r: any) => {
        if (r && r.data) {
          const compraRealizada: any = r.data;
          this.compraRealizada = compraRealizada;
          if (this.carrito && this.carrito.length) {
            this.carrito.forEach((p: any) => this.generarLineaCompra(p));
            this.total = SessionService.usuario.carrito.total;
            this.estado= "compraRealizada";
            this.facturate(this.compraRealizada.id);
          } else {
            this.sweetAlertService.mostrarError('El carrito está vacío');
            this.estado= "";
          }
        } else {
          this.sweetAlertService.mostrarError('El objeto recibido no tiene la estructura esperada.');
        }
      },
      error: (e) => {
        this.estado= "";
        console.error('Error en la llamada HTTP:', e);
        this.sweetAlertService.mostrarError('Error al generar la compra');
      }
    });
  }

  generarLineaCompra(p: any) {
    if (!this.compraRealizada || !this.compraRealizada.id) {
      this.sweetAlertService.mostrarError('No se ha generado una linea de compra válida.');
      return;
    }
    
    this.serverLineaCompra.create({
      compraId: this.compraRealizada.id,
      cantidad: p.quantity,
      componenteId: p.id
    }).subscribe({
      next: (r: any) => {
        if (r && r.data) {
          const lineacompraRealizada: any = r.data;
          this.lineasCompra.push(lineacompraRealizada);
        } else {
          this.sweetAlertService.mostrarError('El objeto recibido no tiene la estructura esperada.');
        }
      },
      error: (e) => {
        this.estado= "";
        console.error('Error en la creación de línea de compra:', e);
        this.sweetAlertService.mostrarError('Error al crear la línea de compra');
      }
    });
  }

  formatDateToYYYYMMDD(d: Date){
    return formatDateToYYYYMMDD(d.toString())
  }


  facturate(id:number){
    this.serverCompra.facturate(id).subscribe({
      next: (r: any) => {
        if (r && r.data && r.message) {
          this.sweetAlertService.alertWithSuccess("Facturacion realizada",r.message)
        } else {
          this.sweetAlertService.mostrarError('El objeto recibido no tiene la estructura esperada.');
        }
      },
      error: (e) => {
        this.estado= "";
        console.error('Error en la creación de línea de compra:', e);
        this.sweetAlertService.mostrarError('Error al crear la línea de compra');
      }
    });
  }
}
