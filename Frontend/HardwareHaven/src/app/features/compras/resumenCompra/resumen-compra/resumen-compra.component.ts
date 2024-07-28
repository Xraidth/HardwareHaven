import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../../../core/services/share/session.service';
import { CompraService } from '../../../../core/services/entities/compra.service';
import { LineaCompraService } from '../../../../core/services/entities/linea-compra.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-resumen-compra',
  standalone: true,
  imports: [],
  templateUrl: './resumen-compra.component.html',
  styleUrl: './resumen-compra.component.css',
  providers:[CompraService, LineaCompraService, CommonModule]
})
export class ResumenCompraComponent implements OnInit {
  public usuario:any;
  public carrito:any;
  public compra:any;
  public compraRealizada: any;
  public lineasCompra: any[] = [];
  constructor(
    private serverCompra: CompraService,
    private serverLineaCompra: LineaCompraService
  ){}
  ngOnInit(): void {
    this.usuario = SessionService.usuario
    this.carrito = this.usuario.carrito;
    this.generarCompra();
  }
  generarCompra(){
    this.serverCompra.create(this.usuario.id).subscribe({
        next: (r: any) => {
          try {
            if (r && r.data && Array.isArray(r.data)) {
              const compraRealizada: any = r.data; 
              this.compraRealizada = compraRealizada;
              this.carrito.forEach((p:any) => {  this.generarLineaCompra(p) });
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
  generarLineaCompra(p:any){
    this.serverLineaCompra.create({
      compraId: this.compraRealizada.id,
      cantidad: p.quantity,
      componenteId: p.id
    }).subscribe({
      next: (r: any) => {
        try {
          if (r && r.data && Array.isArray(r.data)) {
            const lineacompraRealizada: any = r.data; 
            this.lineasCompra.push(lineacompraRealizada);

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
  


}
