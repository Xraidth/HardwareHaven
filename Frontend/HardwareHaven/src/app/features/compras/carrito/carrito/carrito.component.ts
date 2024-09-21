import { Component, OnInit } from '@angular/core';
import { CarritoCardComponent } from '../../../products/components/carritoCard/carrito-card/carrito-card.component';
import { SessionService } from '../../../../core/services/share/session.service';
import { CommonModule } from '@angular/common';
import { getMaxPrice } from '../../../inventario/share/inventario-functions';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CarritoCardComponent, CommonModule],
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit{
  public carrito: any[] = [];
  public total: number = 0;
  mostrarBoton: boolean = false;
  constructor() {}

  ngOnInit(): void {  
    this.carrito = SessionService.usuario.carrito;
    this.calculateTotal();
    if(this.carrito.length == 0){this.mostrarBoton = false} else {this.mostrarBoton = true}
  }
  

  

  calculateTotal() {
    this.total = this.carrito.reduce((sum: number, product: any) => 
      sum + (getMaxPrice(product.precios) * (product.quantity||1) || 0), 0);
    SessionService.usuario.carrito.total = this.total;
  }

  onQuantityChange() {
    this.calculateTotal();
  }
}
