import { Component, OnInit } from '@angular/core';
import { ComponenteService } from '../../core/services/entities/componente.service.js';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../features/products/components/card/card.component.js';
import { UserNavComponent } from '../../shared/user-nav/user-nav.component.js';
import { FormsModule } from '@angular/forms';
import { SessionService } from '../../core/services/share/session.service.js';
import { CategoriaService } from '../../core/services/entities/categoria.service.js';
import { getMaxPrice } from '../../features/inventario/share/inventario-functions.js';


@Component({
  selector: 'productList',
  standalone: true,
  imports: [HttpClientModule, CommonModule, CardComponent, UserNavComponent, FormsModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
  providers: [ComponenteService, CategoriaService]
})
export class ProductListComponent implements OnInit {

  public products: any[] = [];
  public allProducts: any[] = [];  
  public categorias: any[] = [];
  searchQuery: string = '';
  public carrito: any[] = [];
  sortCriteria: string = '';
  sortCriteriaMenu: string = '';
  public usuario: any;

  constructor(
    private serverProduct: ComponenteService,
    private serverCategori: CategoriaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.usuario = SessionService.usuario||SessionService.recordarSession()||undefined
    this.getAllProducts();
    this.getAllCategori();
  }

  getAllProducts() {
    this.serverProduct.getAll().subscribe({
      next: (r: any) => {
        try {
          if (r && r.data && Array.isArray(r.data)) {
            const products: any[] = r.data;
            this.products = products;
            this.allProducts = [...products];  
          } else {
            console.log('El objeto recibido no tiene la estructura esperada.');
          }
        } catch (error) {
          console.error('Error al procesar los datos:', error);
          console.log('Objeto recibido:', r);
        }
      },
      error: (e) => {
        console.error('Error en la llamada HTTP:', e);
      }
    });
  }

  getAllCategori() {
    this.serverCategori.getAll().subscribe({
      next: (r: any) => {
        try {
          if (r && r.data && Array.isArray(r.data)) {
            const categorias: any[] = r.data;
            this.categorias = categorias;
          } else {
            console.log('El objeto recibido no tiene la estructura esperada.');
          }
        } catch (error) {
          console.error('Error al procesar los datos:', error);
          console.log('Objeto recibido:', r);
        }
      },
      error: (e) => {
        console.error('Error en la llamada HTTP:', e);
      }
    });
  }

  onSearch(event: Event) {
    event.preventDefault();
    this.products = this.allProducts.filter(product =>
      product.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  onProductSelected(productCard: any) {
    this.carrito.push(productCard);
  }

  onProductUnSelected(productCard: any) {
    const index = this.carrito.indexOf(productCard);
    if (index > -1) {
      this.carrito.splice(index, 1);
    }
  }

  onSortChangeOrden(event: any) {
    this.sortCriteria = event.target.value;
    this.sortProducts();
  }

  sortProducts() {
    if (this.sortCriteria === 'Or') {
      this.products = [...this.allProducts]; 
    } else if (this.sortCriteria === 'az') {
      this.products.sort((a, b) => a.name.localeCompare(b.name));
    } else if (this.sortCriteria === 'za') {
      this.products.sort((a, b) => b.name.localeCompare(a.name));
    } else if (this.sortCriteria === 'highPrice') {
      this.products.sort((a, b) => getMaxPrice(b.precios) - getMaxPrice(a.precios));
    } else if (this.sortCriteria === 'lowPrice') {
      this.products.sort((a, b) => getMaxPrice(a.precios) - getMaxPrice(b.precios));
    }
  }



  pasarAcompra() {
    SessionService.usuario.carrito = this.carrito;
    this.router.navigate(['compra']);
  }

  onSortChangeMenu(event: any) {
    this.sortCriteriaMenu = event.target.value;
    this.sortByCategoria();
  }

  sortByCategoria() {
    if (this.sortCriteriaMenu === 'Or') {
      this.products = [...this.allProducts];  
    } else {
      this.products = this.allProducts.filter(p => p.categoria.descripcion === this.sortCriteriaMenu);
    }
  }

}
