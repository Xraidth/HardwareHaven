import { Component, OnInit } from '@angular/core';
import { ShopCarCardComponent } from '../../../products/components/carritoCard/carrito-card/shop-car-card.component';
import { SessionService } from '../../../../core/services/share/session.service';
import { CommonModule } from '@angular/common';
import { getMaxPrice } from '../../../../shared/functions/functions';

@Component({
  selector: 'app-shop-car',
  standalone: true,
  imports: [ShopCarCardComponent, CommonModule],
  templateUrl: './shop-car.component.html',
  styleUrls: ['./shop-car.component.css']
})
export class ShopCarComponent implements OnInit{
  public carrito: any[] = [];
  public total: number = 0;
  mostrarBoton: boolean = false;
  constructor() {}

  ngOnInit(): void {
    this.carrito = SessionService.user.carrito;
    this.calculateTotal();
    if(this.carrito.length == 0){this.mostrarBoton = false} else {this.mostrarBoton = true}
  }




  calculateTotal() {
    this.total = this.carrito.reduce((sum: number, product: any) =>
      sum + (getMaxPrice(product.precios) * (product.quantity||1) || 0), 0);
    SessionService.user.carrito.total = this.total;
  }

  onQuantityChange() {
    this.calculateTotal();
  }
}
