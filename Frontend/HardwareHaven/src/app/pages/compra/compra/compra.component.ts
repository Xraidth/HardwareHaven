import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../../core/services/share/session.service';
import { UserNavComponent } from '../../../shared/user-nav/user-nav.component';
import { Router } from '@angular/router';
import { ShopCarComponent } from '../../../features/purchases/carrito/shopCar/shop-car.component';
import { CommonModule } from '@angular/common';
import { SummaryPurchaseComponent } from '../../../features/purchases/resumenCompra/resumen-compra/summary-purchase.component';

@Component({
  selector: 'app-compra',
  standalone: true,
  imports: [UserNavComponent, ShopCarComponent, CommonModule, SummaryPurchaseComponent],
  templateUrl: './compra.component.html',
  styleUrl: './compra.component.css'
})
export class PurchaseComponent implements OnInit {
  public usuario:any;
  public carrito:any;
  mostrarBoton: boolean = false;
  mostrarResumen: boolean = false;
constructor(private router: Router){}
ngOnInit(): void {
  this.usuario = SessionService.user;
  this.carrito = SessionService.shopcar;
  if(this.carrito.length == 0){this.mostrarBoton = false} else {this.mostrarBoton = true}
}


pasarAListaProductos(){
  SessionService.shopcar = this.carrito;
  this.router.navigate(['productList']);
}

realizarCompra(){
  this.mostrarResumen = true;
    this.mostrarBoton = false;
}
}


