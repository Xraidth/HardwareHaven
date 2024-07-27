import { Component, OnInit } from '@angular/core';
import { CarritoCardComponent } from '../../../products/components/carritoCard/carrito-card/carrito-card.component';
import { SessionService } from '../../../../core/services/share/session.service';
import { CommonModule } from '@angular/common';

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
  

  getMaxPrice(precios: any[]): number {
    precios.sort((a, b) => {
      if (a.fecha && b.fecha) {
        return b.fecha.getTime() - a.fecha.getTime();
      }
      return 0; 
    });
    return precios[0]?.valor || 0;
  }

  calculateTotal() {
    this.total = this.carrito.reduce((sum: number, product: any) => 
      sum + (this.getMaxPrice(product.precios) * (product.quantity||1) || 0), 0);
  }

  onQuantityChange() {
    this.calculateTotal();
  }
}
