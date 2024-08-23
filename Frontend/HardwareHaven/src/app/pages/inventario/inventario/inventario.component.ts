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


@Component({
  selector: 'app-inventario',
  standalone: true,
  imports: [UserNavComponent, CommonModule, FormsModule],
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css'],
  providers: [
    UsuarioConectorService, UserService,
    CompraConectorService, CompraService,
    LineaDeCompraConectorService, LineaCompraService,
    PrecioConectorService, PrecioService,
    ComponenteConectorService, ComponenteService,
    CategoriaConectorService, CategoriaService, SweetAlertService
  ]
})
export class InventarioComponent implements OnInit {
  searchQuery: string = '';
  items: any[] = [];
  allItems: any[] = [];
  columns: string[] = [];
  columnsLw: string[] = [];
  nowType: string = '';
  inventarioVacio: boolean = false;
  usuario: any;

  constructor(
    private conectorUsuarioServer: UsuarioConectorService,
    private conectorCompraServer: CompraConectorService,
    private conectorLineaCompraServer: LineaDeCompraConectorService,
    private conectorPrecioServer: PrecioConectorService,
    private conectorComponenteServer: ComponenteConectorService,
    private conectorCategoriaServer: CategoriaConectorService
  ) {}

  ngOnInit(): void {
    this.usuario = SessionService.usuario;
    this.loadItems('Usuario');
  }

 loadItems(type: string): void {
    this.nowType = type;
    this.items = [];
    this.allItems = [];

    switch (type) {
      case 'Usuario': this.allItems = this.conectorUsuarioServer.getAll(); break;
      case 'Compra': this.allItems = this.conectorCompraServer.getAll(); break;
      case 'LineaCompra': this.allItems = this.conectorLineaCompraServer.getAll(); break;
      case 'Componente': this.allItems = this.conectorComponenteServer.getAll(); break;
      case 'Precio': this.allItems = this.conectorPrecioServer.getAll(); break;
      case 'Categoria': this.allItems = this.conectorCategoriaServer.getAll(); break;
    }

    this.items = [...this.allItems];
    this.cargarColumnas();
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
    switch (this.nowType) { case 'Usuario': this.conectorUsuarioServer.registrarUsuario(); break;  
      case 'Compra':this.conectorCompraServer.InsertarCompra(); break;
      case 'LineaCompra': this.conectorLineaCompraServer.InsertarLineaCompra(); break;
      case 'Precio':this.conectorPrecioServer.InsertarPrecio(); break;
      case 'Componente': this.conectorComponenteServer.InsertarComponente(); break;
      case 'Categoria':  this.conectorCategoriaServer.InsertarCategoria(); break;
    }
    this.loadItems(this.nowType);
  }
  

  editarItem(item: any): void {
    switch (this.nowType) {
      case 'Usuario': this.conectorUsuarioServer.update(item); break;
      case 'Compra': this.conectorCompraServer.updateCompra(item); break;
      case 'LineaCompra': this.conectorLineaCompraServer.updateLineaCompra(item); break;
      case 'Componente': this.conectorComponenteServer.updateComponente(item); break;
      case 'Precio': this.conectorPrecioServer.updatePrecio(item); break;
      case 'Categoria': this.conectorCategoriaServer.updateCategoria(item); break;
    }
    this.loadItems(this.nowType);
  }

  eliminarItem(item: any): void {
    switch (this.nowType) {
      case 'Usuario': this.conectorUsuarioServer.delete(item.id); break;
      case 'Compra': this.conectorCompraServer.delete(item.id); break;
      case 'LineaCompra': this.conectorLineaCompraServer.delete(item.id); break;
      case 'Componente': this.conectorComponenteServer.delete(item.id); break;
      case 'Precio': this.conectorPrecioServer.delete(item.id); break;
      case 'Categoria': this.conectorCategoriaServer.delete(item.id); break;
    }
    this.loadItems(this.nowType);
  }

  cargarColumnas(): void {
    if (this.items.length > 0) {
      this.inventarioVacio = false;
      this.columnsLw = Object.keys(this.items[0]);
      this.columns = this.columnsLw.map(this.capitalizeFirstLetterOfEachWord);
      this.columns.push("Editar", "Eliminar");
    } else {
      this.columns = [];
      this.inventarioVacio = true;
    }
  }

  capitalizeFirstLetterOfEachWord(column: string): string {
    return column.split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  formatDateTime(isoString: string): string {
    const date = new Date(isoString);
    return date.toLocaleString('es-ES', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  }

  specialFiltro(nombre: string, dato: any): string {
    if (nombre.includes("precios")) return `$${this.getMaxPrice(dato)}`;
    if (nombre.includes("categoria")) return dato.descripcion;
    if (nombre.includes("componente")) return dato.name;
    if (nombre === "componentes") return Array.isArray(dato) ? (dato.length > 0 ? "Posee componentes" : "No posee componentes") : "-";
    if (nombre.includes("valor")) return `$${dato}`;
    if (nombre.includes("fechaDesde") || nombre.includes("fechaCompra") || nombre.includes("fechaCancel")) return this.formatDateTime(dato);
    if (nombre.includes("lineasCompras")) return Array.isArray(dato) ? (dato.length > 0 ? "Posee lineas" : "Vacia") : "-";
    if (nombre === "compra") return dato.id.toString();
    if (nombre === "user") return dato.name;
    if (nombre.includes("compras")) return Array.isArray(dato) ? (dato.length > 0 ? "Realizo compras" : "No compro") : "-";
    return dato;
  }

  getMaxPrice(precios: any[]): number {
    precios.sort((a, b) => b.fecha?.getTime() - a.fecha?.getTime() || 0);
    return precios[0]?.valor || 0;
  }



  


}
