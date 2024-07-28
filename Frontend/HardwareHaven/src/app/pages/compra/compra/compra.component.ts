import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../../core/services/share/session.service';
import { UserNavComponent } from '../../../shared/user-nav/user-nav.component';
import { Router } from '@angular/router';
import { CarritoComponent } from '../../../features/compras/carrito/carrito/carrito.component';
import { CommonModule } from '@angular/common';
import { ResumenCompraComponent } from '../../../features/compras/resumenCompra/resumen-compra/resumen-compra.component';

@Component({
  selector: 'app-compra',
  standalone: true,
  imports: [UserNavComponent, CarritoComponent, CommonModule, ResumenCompraComponent],
  templateUrl: './compra.component.html',
  styleUrl: './compra.component.css'
})
export class CompraComponent implements OnInit {
  public usuario:any;
  public carrito:any;
  mostrarBoton: boolean = false;
  mostrarResumen: boolean = false;
constructor(private router: Router){}
ngOnInit(): void {
  this.usuario = SessionService.usuario;
  this.carrito = SessionService.usuario.carrito;  
  if(this.carrito.length == 0){this.mostrarBoton = false} else {this.mostrarBoton = true}
}


pasarAListaProductos(){
  SessionService.usuario.carrito = this.carrito;
  this.router.navigate(['productList']);
}

realizarCompra(){
  this.mostrarResumen = true;
    this.mostrarBoton = false; 
}
}


