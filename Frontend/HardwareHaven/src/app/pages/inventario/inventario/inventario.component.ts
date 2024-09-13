import { Component, NgModule, OnInit } from '@angular/core';
import { UserNavComponent } from '../../../shared/user-nav/user-nav.component';
import { SessionService } from '../../../core/services/share/session.service';
import { CommonModule } from '@angular/common';
import { UsuarioConectorService } from '../../../core/services/conectors/usuario-conector.service';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from '../../../core/services/entities/user.service';
import { BrowserModule } from '@angular/platform-browser';
import { CompraConectorService } from '../../../core/services/conectors/compra-conector.service';
import { CompraService } from '../../../core/services/entities/compra.service';
import { LineaDeCompraConectorService } from '../../../core/services/conectors/linea-de-compra-conector.service';
import { LineaCompraService } from '../../../core/services/entities/linea-compra.service';
import { PrecioService } from '../../../core/services/entities/precio.service';
import { PrecioConectorService } from '../../../core/services/conectors/precio-conector.service';
import { ComponenteConectorService } from '../../../core/services/conectors/componente-conector.service';
import { ComponenteService } from '../../../core/services/entities/componente.service';
import { CategoriaConectorService } from '../../../core/services/conectors/categoria-conector.service';
import { CategoriaService } from '../../../core/services/entities/categoria.service';
import { FormsModule } from '@angular/forms';
import { SweetAlertService } from '../../../core/services/notifications/sweet-alert.service';
import { UsuarioComponent } from '../../../features/inventario/usuario/usuario.component';
import { PrecioComponent } from '../../../features/inventario/precio/precio.component';
import { PlusButtonComponent } from '../../../features/inventario/share/plus-button/plus-button.component';


@Component({
  selector: 'app-inventario',
  standalone: true,
  imports: [UserNavComponent, CommonModule, FormsModule, UsuarioComponent, PrecioComponent, PlusButtonComponent],
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css'],
  providers: [
  ]
})
export class InventarioComponent implements OnInit {
  searchQuery: string = '';
  items: any[] = [];
  allItems: any[] = [];
  
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
    this.items = this.allItems.filter(item => this.getSearchText(item).toLowerCase().includes(this.searchQuery.toLowerCase()));
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
