import { Component, EventEmitter, Input, Output, SimpleChanges  } from '@angular/core';
import { UserService } from '../../../../core/services/entities/user.service';
import { SweetAlertService } from '../../../../core/services/notifications/sweet-alert.service';
import { getErrorMessage } from '../inventario-functions';
import { catchError, map, of } from 'rxjs';
import { PrecioService } from '../../../../core/services/entities/precio.service';
import { LineaCompraService } from '../../../../core/services/entities/linea-compra.service';
import { CompraService } from '../../../../core/services/entities/compra.service';
import { ComponenteService } from '../../../../core/services/entities/componente.service';
import { CategoriaService } from '../../../../core/services/entities/categoria.service';



@Component({
  selector: 'app-plus-button',
  standalone: true,
  imports: [],
  templateUrl: './plus-button.component.html',
  styleUrl: './plus-button.component.css',
  providers: [UserService, SweetAlertService, PrecioService,LineaCompraService,CompraService,ComponenteService, CategoriaService]
})
export class PlusButtonComponent {
  @Input() nowType: string | undefined;
  
  usuario: any;
  precio: any;
  linea: any;
  compra: any;
  componente: any;
  categoria: any;
  isLoading = false;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['nowType']) {
      const currentValue = changes['nowType'].currentValue;
      this.nowType = currentValue;}
  }

  constructor(
    private serverLineaCompra: LineaCompraService,
    private serverPrecio: PrecioService,
    private serverUser: UserService,
    private sweetAlertService: SweetAlertService,
    private serverCompra: CompraService,
    private serverComponente: ComponenteService,
    private serverCategoria: CategoriaService ,
    
  ) {}
  
  plusButton(){
    switch (this.nowType) {
      case "Usuario": this.insertUsuario(); break;
      case "Compra":  this.insertCompra(); break;
      case "LineaCompra":this.insertLineaCompra();break;
      case "Componente":this.insertComponente();break;
      case "Precio":this.insertPrecio(); break;
      case "Categoria": this.insertCategoria(); break;
    }
  }

  setChangesToAdd(){
    if(this.nowType){
      
      
    }
    else{console.log("Error");}
  }

  async insertUsuario(): Promise<void> {
    const credenciales = await this.sweetAlertService.mostrarFormularioRegistro();
    if (credenciales) {
      this.serverUser.create({
        name: credenciales.username,
        password: credenciales.password,
        email: credenciales.email,
        tipoUsuario: credenciales.userType
      }).pipe(
        catchError((error) => {
          this.isLoading = false;
        const errorMessage = getErrorMessage(error);
        this.sweetAlertService.mostrarError(errorMessage); 
          return of(null);
        })
      ).subscribe((response: any) => {
        if (response?.data) {
          this.usuario = response.data;
          this.setChangesToAdd();
        }
      });
    }
  }

  async insertPrecio(): Promise<void> {
    const credenciales = await this.sweetAlertService.InsertPrecio();
    if (credenciales) {
      this.serverPrecio.create({
        fechaDesde: credenciales.fechaDesde,
        componenteId: credenciales.componenteId,
        valor: credenciales.valor
      }).pipe(
        catchError((error) => {
          this.isLoading = false;
        const errorMessage = getErrorMessage(error);
        this.sweetAlertService.mostrarError(errorMessage); 
          return of(null);
        })
      ).subscribe((response: any) => {
        if (response?.data) {
          this.precio = response.data;
          this.setChangesToAdd();
        }
      });
    }
  }

  async insertLineaCompra() {
    const credenciales = await this.sweetAlertService.InsertLineaCompra();
    if (credenciales) {
      this.serverLineaCompra.create({
        compraId: credenciales.compraId,
        cantidad: credenciales.cantidad,
        componenteId: credenciales.componenteId
      }).pipe(
        map((r: any) => {
          if (r && r.data) {
            return r.data;
          } else {
            console.log('El objeto recibido no tiene la estructura esperada.');
            return null;
          }
        }),
        catchError((error) => {
          this.isLoading = false;
        const errorMessage = getErrorMessage(error);
        this.sweetAlertService.mostrarError(errorMessage); 
          return of(null);
        })
      ).subscribe({
        next: (lineaCompra: any) => {
          if (lineaCompra) {
            this.linea = lineaCompra
            this.setChangesToAdd();
          }
        }
      });
    }
  }

  async insertCompra() {
    const credenciales = await this.sweetAlertService.InsertCompra();
    if (credenciales) {
      this.serverCompra.create({
        userId: credenciales.userId
      }).pipe(
        map((r: any) => {
          if (r && r.data) {
            return r.data; 
          } else {
            console.log('El objeto recibido no tiene la estructura esperada.');
            return null;
          }
        }),
        catchError((error) => {
          this.isLoading = false;
        const errorMessage = getErrorMessage(error);
        this.sweetAlertService.mostrarError(errorMessage); 
          return of(null);
        })
      ).subscribe({
        next: (compra: any) => {
          if (compra) {
            this.compra = compra
            this.setChangesToAdd();
          }
        }
      });
    }
  }
  
  async insertComponente() {
    const credenciales = await this.sweetAlertService.InsertComponente();
    if (credenciales) {
      this.serverComponente.create({
        name: credenciales.name,
        description: credenciales.description,
        categoriaId: credenciales.categoriaId
      }).pipe(
        map((response: any) => {
          if (response && response.data) {
            return response.data;  
          } else {
            console.log('El objeto recibido no tiene la estructura esperada.');
            return null;
          }
        }),
        catchError((error) => {
          this.isLoading = false;
        const errorMessage = getErrorMessage(error);
        this.sweetAlertService.mostrarError(errorMessage); 
          return of(null);  
        })
      ).subscribe((componente: any) => {
        if (componente) {
          this.componente = componente;
          this.setChangesToAdd();
        }
      });
    }
  }

  
  async insertCategoria() {
    const credenciales = await this.sweetAlertService.InsertCategoria();
    if (credenciales) {
      this.serverCategoria.create({
        descripcion: credenciales.description
      }).pipe(
        map((response: any) => {
          if (response && response.data) {
            return response.data;  
          } else {
            console.log('El objeto recibido no tiene la estructura esperada.');
            return null;
          }
        }),
        catchError((error) => {
          this.isLoading = false;
          const errorMessage = getErrorMessage(error);
          this.sweetAlertService.mostrarError(errorMessage); 
          return of(null);  
        })
      ).subscribe((categoria: any) => {
        if (categoria) {
          this.categoria = categoria;
          this.setChangesToAdd();
        }
      });
    }
  }
  
}
