import { Component, NgModule, OnInit } from '@angular/core';
import { UserNavComponent } from '../../../shared/user-nav/user-nav.component';
import { SessionService } from '../../../core/services/share/session.service';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { UserService } from '../../../core/services/entities/user.service';
import { BrowserModule } from '@angular/platform-browser';

import { CompraService } from '../../../core/services/entities/compra.service';

import { LineaCompraService } from '../../../core/services/entities/linea-compra.service';
import { PrecioService } from '../../../core/services/entities/precio.service';


import { ComponenteService } from '../../../core/services/entities/componente.service';

import { CategoriaService } from '../../../core/services/entities/categoria.service';
import { FormsModule } from '@angular/forms';
import { SweetAlertService } from '../../../core/services/notifications/sweet-alert.service';
import { UsuarioComponent } from '../../../features/inventario/usuario/usuario.component';
import { PrecioComponent } from '../../../features/inventario/precio/precio.component';
import { PlusButtonComponent } from '../../../features/inventario/share/plus-button/plus-button.component';
import { LineaCompraComponent } from '../../../features/inventario/linea-compra/linea-compra.component';
import { CompraComponent } from '../../../features/inventario/compra/compra.component';
import { ComponenteComponent } from '../../../features/inventario/componente/componente.component';
import { CategoriaComponent } from '../../../features/inventario/categoria/categoria.component';


@Component({
  selector: 'app-inventario',
  standalone: true,
  imports: [
    UserNavComponent, 
    CommonModule, 
    FormsModule, 
    UsuarioComponent, 
    PrecioComponent,
    LineaCompraComponent,
    CompraComponent,
    ComponenteComponent,
    CategoriaComponent,
    PlusButtonComponent,
    
  ],
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css'],
  providers: [
  ]
})
export class InventarioComponent implements OnInit {
  searchQuery: string = '';
  nowType: string = '';
  inventarioVacio: boolean = false;
  usuario: any;

  constructor(
    
  ) {}

  ngOnInit(): void {
    this.usuario = SessionService.usuario;
    this.nowType="Usuario"
  }
  loadItems(type:string){
  this.nowType=type;
  }
  onSearch(event: Event): void {
    event.preventDefault();
   // this.items = this.allItems.filter(item => this.getSearchText(item).toLowerCase().includes(this.searchQuery.toLowerCase()));
  }
  getSearchText(item: any): string {
    switch (this.nowType) {
      case 'Usuario': return item.name;
      case 'Compra': return item.user.name; 
      case 'LineaCompra': return item.componente.name;
      case 'Precio': return item.componente.name;
      case 'Componente': return item.name;
      case 'Categoria': return item.descripcion;
      default: return '';
    }
  }

  plusButton(): void {
 
  }
  
}
