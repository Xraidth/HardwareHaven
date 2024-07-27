import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';  
import { SessionService } from '../../../../../core/services/share/session.service';

@Component({
  selector: 'app-carrito-card',
  standalone: true,
  imports: [FormsModule], 
  templateUrl: './carrito-card.component.html',
  styleUrls: ['./carrito-card.component.css']
})
export class CarritoCardComponent implements OnInit {
  public quantity: number = 1;  
  public carrito: any;
  @Input() product: any;
  @Output() quantityChange = new EventEmitter<void>();  // Nuevo Output para emitir cambios

  ngOnInit() {
    if (!this.product) {
      console.error('Product is undefined');
    }
    this.carrito = SessionService.usuario.carrito;
  }

  getMaxPrice(precios: any[]): number {
    precios.sort((a, b) => {
      if (a.fecha && b.fecha) {
        return b.fecha.getTime() - a.fecha.getTime();
      }
      return 0; 
    });
    const maxPrice = precios[0]?.valor || 0;
    return parseFloat(maxPrice.toFixed(2));
  }

 

  calculateLineCarrito(precios:any[]){
    
    return parseFloat((this.getMaxPrice(precios)*this.quantity).toFixed(2));
  }

  decrementQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
      this.guardarCantidad();
      this.quantityChange.emit();  // Emitir el evento
    }
  }

  incrementQuantity() {
    this.quantity++;    
    this.guardarCantidad();
    this.quantityChange.emit();  // Emitir el evento
  }

  guardarCantidad(){
    this.carrito.find((item: any) => item.id === this.product.id).quantity = this.quantity;
  }
}
