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






@Component({
  selector: 'app-inventario',
  standalone: true,
  imports: [UserNavComponent, CommonModule, HttpClientModule],
  templateUrl: './inventario.component.html',
  styleUrl: './inventario.component.css',
  providers: [
    UsuarioConectorService, UserService,
    CompraConectorService, CompraService,
    LineaDeCompraConectorService, LineaCompraService,
    PrecioConectorService,PrecioService,
    ComponenteConectorService, ComponenteService,
    CategoriaConectorService, CategoriaService
  ]
})
export class InventarioComponent implements OnInit {
constructor(
 private conectorUsuarioServer: UsuarioConectorService,
 private conectorCompraServer: CompraConectorService,
 private conectorLineaCompraServer: LineaDeCompraConectorService,
 private conectorPrecioServer: PrecioConectorService,
 private conectorComponenteServer: ComponenteConectorService,
 private conectorCategoriaServer: CategoriaConectorService,
  
){}

  public usuario:any;
  public columns: string[] = [];
  public columnsLw: string[] = [];
  public items: any[] = [];
  public inventarioVacio: boolean = false;
  public nowType ="";
ngOnInit(): void {
  this.usuario = SessionService.usuario;
  this.click_Usuarios();
}


plusButton(){
switch (this.nowType) {
    case "Usuario":break;
    case "Compra": break;
    case "LineaCompra": break;
    case"Componente": break;
    case"Precio": break;
    case "Categoria": break;    
  }
}

editarItem(item: any) {
  console.log('Editar item:', item, this.nowType);

  /*switch (this.nowType) {
    case "Usuario": this.conectorUsuarioServer.update;break;
    case "Compra": this.conectorCompraServer.update;break;
    case "LineaCompra": this.conectorLineaCompraServer.update;break;
    case"Componente": this.conectorComponenteServer.update;break;
    case"Precio": this.conectorPrecioServer.update;break;
    case "Categoria": this.conectorCategoriaServer.update;break;    
  }*/
  
}

eliminarItem(item: any) {
  //console.log('Eliminar item:', item, this.nowType);

  switch (this.nowType) {
    case "Usuario": 
    this.conectorUsuarioServer.delete(item.id);
    this.click_Usuarios();
    break;
    case "Compra": this.conectorCompraServer.delete(item.id);
    this.click_Compras();
    break;
    case "LineaCompra": this.conectorLineaCompraServer.delete(item.id);
    this.click_LineaCompras();
    break;
    case"Componente": this.conectorComponenteServer.delete(item.id);
    this.click_Componentes();
    break;
    case"Precio": this.conectorPrecioServer.delete(item.id);
    this.click_Precios();
    break;
    case "Categoria": this.conectorCategoriaServer.delete(item.id);
    this.click_Categorias();
    break;
  }
  

}

public vaciarlista(){
  this.items=[];
}

public cargarColumnas(){
  if(this.items[0]){
    this.inventarioVacio = false;
    this.columnsLw = Object.keys(this.items[0])
    this.columns = this.capitalizeFirstLetterOfEachWord(this.columnsLw);
    this.columns.push("Editar", "Eliminar");
  }
  else{ 
    this.columns = [];
    this.inventarioVacio = true;}
}

public capitalizeFirstLetterOfEachWord(arr: string[]): string[] {
  return arr.map(column => 
    column
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  );
}


click_Usuarios(){
  this.nowType = "Usuario";
  this.vaciarlista();
  this.items = this.conectorUsuarioServer.getAll();
this.cargarColumnas();
}
click_Compras(){
  this.nowType = "Compra";
  this.vaciarlista();
  this.items = this.conectorCompraServer.getAll();
this.cargarColumnas();
}
click_LineaCompras(){
  this.nowType = "LineaCompra";
  this.vaciarlista();
  this.items = this.conectorLineaCompraServer.getAll();
this.cargarColumnas();
}
click_Componentes(){
this.nowType = "Componente";
this.vaciarlista();
this.items = this.conectorComponenteServer.getAll();
this.cargarColumnas();
}
click_Precios(){
  this.nowType = "Precio";
  this.vaciarlista();
  this.items = this.conectorPrecioServer.getAll();
this.cargarColumnas();
}
click_Categorias(){
  this.nowType = "Categoria";
  this.vaciarlista();
  this.items = this.conectorCategoriaServer.getAll();
this.cargarColumnas();
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


formatDateTime(isoString: string): string {
  
  const date = new Date(isoString);


  const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      
  };


  return date.toLocaleString('es-ES', options);
}

specialFiltro(nombre: string, dato: any) {
let f = "-"

if(nombre.includes("precios")){
  f = "$"+ this.getMaxPrice(dato).toString();
}
else if (nombre.includes("categoria")){
  f = dato.descripcion;
}
else if (nombre.includes("componente")){
  f = dato.name;
}
else if (nombre==="componentes"){
  if (Array.isArray(dato)) {
    f = dato.length > 0 ? "Posee componentes" : "No posee componentes";}
}
else if (nombre.includes("valor")){
  f = "$"+ (dato).toString();
}
else if (nombre.includes("fechaDesde")){
  f = this.formatDateTime(dato.toString());
}
else if (nombre.includes("fechaCompra")){
  f = this.formatDateTime(dato.toString());
}
else if (nombre.includes("fechaCancel")){
  if(dato){ f = this.formatDateTime(dato.toString());} 
}
else if (nombre.includes("lineasCompras")){
  if (Array.isArray(dato)) {
    f = dato.length > 0 ? "Posee lineas" : "Vacia";}
}
else if (nombre === "compra"){
  f= dato.id.toString();
    
}else if (nombre === "user"){
  f= dato.name;
    
}
else if (nombre.includes("compras")){
  if (Array.isArray(dato)) {
     f = dato.length > 0 ? "Realizo compras" : "No compro";}
}
else{
  f= dato;
}

return f
}

}
