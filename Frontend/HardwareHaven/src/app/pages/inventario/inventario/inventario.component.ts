import { Component, NgModule, OnInit } from '@angular/core';
import { UserNavComponent } from '../../../shared/user-nav/user-nav.component';
import { SessionService } from '../../../core/services/share/session.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserComponent } from '../../../features/inventory/user/user.component';
import { PriceComponent } from '../../../features/inventory/price/price.component';
import { PlusButtonComponent } from '../../../features/inventory/share/plus-button/plus-button.component';
import { PurchaseLineComponent } from '../../../features/inventory/purchaseLine/purchase-line.component';
import { PurchaseComponent } from '../../../features/inventory/purchase/purchase.component';
import { ComponentComponent } from '../../../features/inventory/component/component.component';
import { CategoryComponent } from '../../../features/inventory/category/category.component';


@Component({
  selector: 'app-inventario',
  standalone: true,
  imports: [
    UserNavComponent,
    CommonModule,
    FormsModule,
    UserComponent,
    PriceComponent,
    PurchaseLineComponent,
    PurchaseComponent,
    ComponentComponent,
    CategoryComponent,
    PlusButtonComponent,

  ],
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css'],
  providers: [
  ]
})
export class InventoryComponent implements OnInit {
  searchQuery: string = '';
  auxsearchQuery: string = '';
  nowType: string = '';
  carga:string = ""
  usuario: any;

  ngOnInit(): void {
    this.usuario = SessionService.user;
    this.getplusbuttonChange("Usuario");
  }
  loadItems(type:string){
  this.nowType=type;
  }
  onSearch(event: Event): void {
    event.preventDefault();
   this.searchQuery = this.auxsearchQuery
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

  getplusbuttonChange(e: string): void {

    this.carga = "Cargando...";
    this.loadItems("Cargando");

    setTimeout(() => {
      this.carga = '';
      this.loadItems(e);
    }, 2000);
  }

}
