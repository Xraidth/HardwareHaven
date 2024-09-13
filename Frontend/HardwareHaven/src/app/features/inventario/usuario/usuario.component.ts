import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../../../core/services/entities/user.service';
import { SweetAlertService } from '../../../core/services/notifications/sweet-alert.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { 
  capitalizeFirstLetterOfEachWord, 
  specialFiltro 
} from '../share/inventario-functions';


@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css'],
  providers: [UserService, SweetAlertService]
})
export class UsuarioComponent implements OnInit {
  @Input() searchQuery: string| undefined;

  usuarios: any[] = [];
  usuario: any = {};
  inventarioVacio = false;
  columns: string[] = [];
  columnsLw: string[] = [];
  isLoading = false; 

  constructor(
    private serverUser: UserService,
    private sweetAlertService: SweetAlertService
  ) {}

  ngOnInit(): void {
    this.cargarEntidad();
  }

  cargarEntidad(): void {
    this.getAll();
  }

  cargarColumnas(): void {
    if (this.usuarios.length > 0) {
      this.inventarioVacio = false;
      this.columnsLw = Object.keys(this.usuarios[0]);
      this.columns = this.columnsLw.map(capitalizeFirstLetterOfEachWord);
      this.columns.push("Editar", "Eliminar");
    } else {
      this.columns = [];
      this.inventarioVacio = true;
    }
  }


  getAll(): void {
    this.isLoading = true; // Muestra el indicador de carga
    this.serverUser.getAll().pipe(
      map((response: any) => response?.data || []),
      catchError((error) => {
        console.error('Error en la llamada HTTP:', error);
        return of([]);
      })
    ).subscribe((usuarios: any[]) => {
      this.usuarios = usuarios;
      this.cargarColumnas();
      this.isLoading = false; // Oculta el indicador de carga
    });
  }

  eliminarItem(usuario: any): void {
    this.delete(usuario.id);
    this.cargarEntidad();
  }

  editarItem(usuario: any): void {
    this.update(usuario);
    this.cargarEntidad();
  }

  delete(id: number): void {
    this.serverUser.delete(id).pipe(
      catchError((error) => {
        console.error('Error al eliminar usuario:', error);
        return of(null);
      })
    ).subscribe((response: any) => {
      if (response?.data) {
        this.usuarios = this.usuarios.filter(u => u.id !== id);
      }
    });
  }

  async insert(): Promise<void> {
    const credenciales = await this.sweetAlertService.mostrarFormularioRegistro();
    if (credenciales) {
      this.serverUser.create({
        name: credenciales.username,
        password: credenciales.password,
        email: credenciales.email,
        tipoUsuario: credenciales.userType
      }).pipe(
        catchError((error) => {
          console.error('Error al registrar usuario:', error);
          return of(null);
        })
      ).subscribe((response: any) => {
        if (response?.data) {
          this.usuarios.push(response.data);
        }
      });
    }
  }

  async update(usuario: any): Promise<void> {
    const credenciales = await this.sweetAlertService.mostrarConfigurarCuenta(usuario);
    if (credenciales) {
      this.serverUser.update(usuario.id, {
        newPassword: credenciales.newPassword,
        oldPassword: credenciales.oldPassword,
        newUserName: credenciales.newUserName,
        newEmail: credenciales.newEmail,
        newUserType: credenciales.newUserType
      }).pipe(
        catchError((error) => {
          console.error('Error al actualizar usuario:', error);
          return of(null);
        })
      ).subscribe((response: any) => {
        if (response?.data) {
          this.usuarios = this.usuarios.map(u => u.id === usuario.id ? response.data : u);
        }
      });
    }
  }

  specialFiltro(nombre: string, dato: any): string {
    return specialFiltro(nombre, dato);
  }
}
