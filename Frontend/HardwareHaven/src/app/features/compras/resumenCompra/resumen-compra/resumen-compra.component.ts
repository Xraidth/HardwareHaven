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
  public user: any;
  public carrito: any;
  public sale: any;
  public purchaseMade: any;
  public purchasesLine: any[] = [];
  public total: any;
  public loading: boolean = false;
  public purchaseFinished: boolean = false;


  constructor(
    private serverCompra: CompraService,
    private serverLineaCompra: LineaCompraService,
    private sweetAlertService: SweetAlertService
  ) {}

  ngOnInit(): void {

    this.user = SessionService.usuario;
    if (this.user && this.user.carrito) {
      this.carrito = this.user.carrito;
      this.generatePurchase();}
    else{
      this.sweetAlertService.mostrarError('Cart shop or user information was not founded');
      return;
    }



  }

  generatePurchase() {
    this.loading = true;
    this.purchaseFinished = false;

    this.serverCompra.create({ userId: this.user.id }).pipe(
    ).subscribe({
      next: (r: any) => {
        if (r && r.data) {
          this.purchaseMade = r.data;

          if (this.carrito && this.carrito.length) {
            for (const p of this.carrito) {
              this.generarLineaCompra(p);
            }
            this.total = SessionService.usuario.carrito.total;
            this.purchaseMade.total = this.total;
            this.purchaseFinished = true;
          } else {
            this.sweetAlertService.mostrarError('The shop car is empty');
          }
        } else {
          this.sweetAlertService.mostrarError('There was an error.');
        }
        this.loading = false;
      },
      error: (e) => {
        this.sweetAlertService.mostrarError('Error to generate purchase');
        this.loading = false;
      }
    });
  }



  generarLineaCompra(p: any) {
    if (!this.purchaseMade || !this.purchaseMade.id) {
      this.sweetAlertService.mostrarError('No se ha generado una linea de compra válida.');
      return;
    }

    this.serverLineaCompra.create({
      compraId: this.purchaseMade.id,
      cantidad: p.quantity,
      componenteId: p.id
    }).subscribe({
      next: (r: any) => {
        if (r && r.data) {
          const lineacompraRealizada: any = r.data;
          this.purchasesLine.push(lineacompraRealizada);
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



  invoiceButton(){
  this.facturate(this.purchaseMade.id);
}

}
