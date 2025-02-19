import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SessionService } from '../../../../../core/services/share/session.service';
import { getMaxPrice } from '../../../../../shared/functions/functions';

@Component({
  selector: 'app-carrito-card',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './carrito-card.component.html',
  styleUrls: ['./carrito-card.component.css']
})
export class ShopCarCardComponent implements OnInit {
  public quantity: number = 1;
  public carrito: any;
  productoDelCarro: any;
  @Input() product: any;
  @Output() quantityChange = new EventEmitter<void>();

  ngOnInit() {

    this.carrito = SessionService.user.carrito;
    this.productoDelCarro = this.carrito.find((item: any) => item.id == this.product.id);
    this.productoDelCarro.quantity = 1;
  }





  calculateLineCarrito(precios:any[]){

    return parseFloat((getMaxPrice(precios)*this.quantity).toFixed(2));
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

  guardarCantidad() {
    if (this.productoDelCarro) {
        // Si el producto ya existe, actualiza la cantidad
        this.productoDelCarro.quantity = this.quantity;
    }
}

removeProduct() {
  if (this.productoDelCarro) {
      const index = this.carrito.indexOf(this.productoDelCarro);
      if (index !== -1) {
          this.carrito.splice(index, 1);
          SessionService.user.carrito = this.carrito;
          this.quantityChange.emit();
      }
  }
}


}
