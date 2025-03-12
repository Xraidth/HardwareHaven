import { Component, NgModule, OnInit } from '@angular/core';
import { SessionService } from '../../../../core/services/share/session.service';
import { PurchaseService } from '../../../../core/services/entities/purchase.service';
import { PurchaseLineService } from '../../../../core/services/entities/purchase-line.service';
import { SweetAlertService } from '../../../../core/services/notifications/sweet-alert.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule ,  NgIf} from '@angular/common';


@Component({
  selector: 'app-summary-purchase',
  standalone: true,
  imports: [CommonModule,HttpClientModule, FormsModule],
  templateUrl: './summary-purchase.component.html',
  styleUrls: ['./summary-purchase.component.css'],
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
    this.shopcar = SessionService.shopcar;
    if (this.user && this.shopcar) {
      this.generatePurchase();
    } else {
      this.sweetAlertService.showError('Cart shop or user information was not found');
      return;
    }
  }


  async generatePurchase() {
    this.loading = true;
    this.purchaseFinished = false;

    try {
      const r: any = await this.serverCompra.create({ userId: this.user.id }).toPromise();
      if (r && r.data) {
        this.purchaseMade = r.data;

        if (this.shopcar && this.shopcar.length) {

          for (const p of this.shopcar) {
            await this.generatePurchaseLine(p);
          }
          this.total = SessionService.shopcar.total;
          this.purchaseMade.total = this.total;
          this.purchaseFinished = true;
        } else {
          this.sweetAlertService.showError('The shop car is empty');
        }
      } else {
        this.sweetAlertService.showError('There was an error.');
      }
    } catch (e) {
      this.sweetAlertService.showError('Error to generate purchase');
    } finally {
      this.loading = false;
    }
  }


  async generatePurchaseLine(p: any) {
    if (!this.purchaseMade || !this.purchaseMade.id) {
      this.sweetAlertService.showError('Invalid purchase line');
      return;
    }

    try {
      const r: any = await this.serverLineaCompra.create({
        compraId: this.purchaseMade.id,
        cantidad: p.quantity,
        componenteId: p.id
      }).toPromise();

      if (r && r.data) {
        const purchaseLineMade: any = r.data;
        this.purchasesLine.push(purchaseLineMade);
      } else {
        this.sweetAlertService.showError('Error in the creation of the purchase');
      }
    } catch (e) {
      this.sweetAlertService.showError('Error in the creation of the purchase');
    }
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

  invoiceButton() {
    this.invoice(this.purchaseMade.id);
  }
}
