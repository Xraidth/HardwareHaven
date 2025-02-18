import { Component, NgModule, OnInit } from '@angular/core';
import { SessionService } from '../../../../core/services/share/session.service';
import { CompraService } from '../../../../core/services/entities/compra.service';
import { LineaCompraService } from '../../../../core/services/entities/linea-compra.service';
import { SweetAlertService } from '../../../../core/services/notifications/sweet-alert.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule ,  NgIf} from '@angular/common';


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
  public cargando: boolean = false;
  public compraFinalizada: boolean = false;


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
    this.cargando = true;
    this.compraFinalizada = false;

    this.serverCompra.create({ userId: this.usuario.id }).pipe(
    ).subscribe({
      next: (r: any) => {
        if (r && r.data) {
          this.compraRealizada = r.data;

          if (this.carrito && this.carrito.length) {
            for (const p of this.carrito) {
              this.generarLineaCompra(p);
            }
            this.total = SessionService.usuario.carrito.total;
            this.compraRealizada.total = this.total;
            this.compraFinalizada = true;
          } else {
            this.sweetAlertService.mostrarError('El carrito está vacío');
          }
        } else {
          this.sweetAlertService.mostrarError('El objeto recibido no tiene la estructura esperada.');
        }
        this.cargando = false;
      },
      error: (e) => {
        this.sweetAlertService.mostrarError('Error al generar la compra');
        this.cargando = false;
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
        this.sweetAlertService.mostrarError('Error al crear la línea de compra');
      }
    });
  }

  facturate(id: number) {
    this.serverCompra.facturate(id).subscribe({
      next: (response: Blob) => {

        const url = window.URL.createObjectURL(response);

        window.open(url, '_blank');
      },
      error: (error) => {

        this.sweetAlertService.mostrarError('Error al facturar la compra');
      },
    });
  }



facturaBoton(){
  this.facturate(this.compraRealizada.id);
}

}
