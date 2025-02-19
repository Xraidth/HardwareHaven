import { Component, NgModule, OnInit } from '@angular/core';
import { SessionService } from '../../../../core/services/share/session.service';
import { PurchaseService } from '../../../../core/services/entities/compra.service';
import { PurchaseLineService } from '../../../../core/services/entities/linea-compra.service';
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
  providers: [PurchaseService, PurchaseLineService]
})
export class SummaryPurchaseComponent implements OnInit {
  public user: any;
  public shopcar: any;
  public sale: any;
  public purchaseMade: any;
  public purchasesLine: any[] = [];
  public total: any;
  public loading: boolean = false;
  public purchaseFinished: boolean = false;


  constructor(
    private serverCompra: PurchaseService,
    private serverLineaCompra: PurchaseLineService,
    private sweetAlertService: SweetAlertService
  ) {}

  ngOnInit(): void {

    this.user = SessionService.user;
    if (this.user && this.user.carrito) {
      this.shopcar = this.user.carrito;
      this.generatePurchase();}
    else{
      this.sweetAlertService.showError('Cart shop or user information was not founded');
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

          if (this.shopcar && this.shopcar.length) {
            for (const p of this.shopcar) {
              this.generatePurchaseLine(p);
            }
            this.total = SessionService.user.carrito.total;
            this.purchaseMade.total = this.total;
            this.purchaseFinished = true;
          } else {
            this.sweetAlertService.showError('The shop car is empty');
          }
        } else {
          this.sweetAlertService.showError('There was an error.');
        }
        this.loading = false;
      },
      error: (e) => {
        this.sweetAlertService.showError('Error to generate purchase');
        this.loading = false;
      }
    });
  }



  generatePurchaseLine(p: any) {
    if (!this.purchaseMade || !this.purchaseMade.id) {
      this.sweetAlertService.showError('Invalid purchase line');
      return;
    }

    this.serverLineaCompra.create({
      compraId: this.purchaseMade.id,
      cantidad: p.quantity,
      componenteId: p.id
    }).subscribe({
      next: (r: any) => {
        if (r && r.data) {
          const purchaseLineMade: any = r.data;
          this.purchasesLine.push(purchaseLineMade);
        } else {
          this.sweetAlertService.showError('Error in the creation of the purchase');
        }
      },
      error: (e) => {
        this.sweetAlertService.showError('Error in the creation of the purchase');
      }
    });
  }

  invoice(id: number) {
    this.serverCompra.facturate(id).subscribe({
      next: (response: Blob) => {

        const url = window.URL.createObjectURL(response);

        window.open(url, '_blank');
      },
      error: (error) => {

        this.sweetAlertService.showError('Purchase billing Error');
      },
    });
  }



  invoiceButton(){
  this.invoice(this.purchaseMade.id);
}

}
