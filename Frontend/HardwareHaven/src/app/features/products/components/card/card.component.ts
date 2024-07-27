import { Component, Input, Output, EventEmitter, NgModule , OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
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

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadProducts();
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
 
  
  

}