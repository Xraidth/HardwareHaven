import { Component, Input, Output, EventEmitter, NgModule , OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { SweetAlertService } from '../../../../core/services/notifications/sweet-alert.service';
import { SessionService } from '../../../../core/services/share/session.service';
import { getMaxPrice } from '../../../inventario/share/inventario-functions';
@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent implements OnInit {

  @Input() product: any;
  @Output() productSelected = new EventEmitter<any>(); 
  @Output() productUnSelected = new EventEmitter<any>(); 

  public isSelected: boolean= false;
  products: { name: string, imageUrl: string }[] = [];

  constructor(private http: HttpClient, private sweetAlertService: SweetAlertService) {}

  ngOnInit(): void {
    this.loadProducts();
    this.verificateSelection();
  }
  verificateSelection(): void {
    const carrito = SessionService.usuario?.carrito || [];
    const productInCart = carrito.find((item: any) => item.id == this.product.id);
    if (productInCart) {
      this.selectProduct();
    }
  }
  

  getMaxPrice(precios: any[]): number {
    return getMaxPrice(precios);
  }
  

  selectProduct() {
    if(!this.isSelected){
    this.productSelected.emit(this.product);  
    this.isSelected = true;
    
  }
  }
  unSelectProduct(){
    if(this.isSelected){
      this.productUnSelected.emit(this.product);  
      this.isSelected = false;
    }
  }
 
  loadProducts() {
    this.http.get<{ name: string, imageUrl: string }[]>('assets/products.json')
      .subscribe(data => {
        this.products = data;
        this.searchProduct();
      });
  
  }
  searchProduct() {
    
    const foundProduct = this.products.find(x => this.product.name.toLowerCase().includes(x.name.toLowerCase()));

    
    if (foundProduct) {
      this.product.imageUrl = foundProduct.imageUrl;
    } else {
      this.product.imageUrl = "https://www.smarttools.com.mx/wp-content/uploads/2019/05/imagen-no-disponible.png";
      
    }
  }

  infoProduct(){
    this.sweetAlertService.mostrarDetalleProducto(this.product);
  }
 
  
  

}