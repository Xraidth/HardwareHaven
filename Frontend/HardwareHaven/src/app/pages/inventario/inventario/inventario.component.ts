import { Component, NgModule, OnInit } from '@angular/core';
import { UserNavComponent } from '../../../shared/user-nav/user-nav.component';
import { SessionService } from '../../../core/services/share/session.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuarioComponent } from '../../../features/inventory/usuario/usuario.component';
import { PrecioComponent } from '../../../features/inventory/precio/precio.component';
import { PlusButtonComponent } from '../../../features/inventory/share/plus-button/plus-button.component';
import { LineaCompraComponent } from '../../../features/inventory/linea-compra/linea-compra.component';
import { CompraComponent } from '../../../features/inventory/compra/compra.component';
import { ComponenteComponent } from '../../../features/inventory/componente/componente.component';
import { CategoriaComponent } from '../../../features/inventory/categoria/categoria.component';


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
  auxsearchQuery: string = '';
  nowType: string = '';
  carga:string = ""
  usuario: any;

  constructor(

  ) {}


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
