import { Component, Input, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { UserService } from '../../../core/services/entities/user.service';
import { SweetAlertService } from '../../../core/services/notifications/sweet-alert.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { catchError, map, share } from 'rxjs/operators';
import { of, Subscription } from 'rxjs';
import {
  capitalizeFirstLetterOfEachWord,
  getErrorMessage,
  specialFiltro
} from '../../../shared/functions/functions';
import { SessionService } from '../../../core/services/share/session.service';
import { Router } from '@angular/router';





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
  originalusuarios: any[] = [];


  constructor(
    private serverUser: UserService,
    private sweetAlertService: SweetAlertService,
    private router: Router

  ) {}

  subscription: any;

  ngOnInit(): void {
    this.cargarEntidad();

  }


  ngOnChanges(changes: SimpleChanges) {
    if (changes['searchQuery']) {
      const currentValue = changes['searchQuery'].currentValue;
      this.searchQuery = currentValue || '';

      if (this.searchQuery === '') {

        this.usuarios = [...this.originalusuarios];
      } else {

        this.usuarios = this.originalusuarios.filter(x =>
          x.name.toLowerCase().includes(this.searchQuery?.toLowerCase())
        );
      }
    }
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
    this.isLoading = true;
    this.serverUser.getAll().pipe(
      map((response: any) => response?.data || []),
      catchError((error) => {
        this.isLoading = false;
        const errorMessage = getErrorMessage(error);
        this.sweetAlertService.mostrarError(errorMessage);
        return of([]);
      })
    ).subscribe((usuarios: any[]) => {
      this.usuarios = usuarios;
      this.originalusuarios = [...usuarios];
      this.cargarColumnas();
      this.isLoading = false;
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

  public delete(id: number) {
    this.sweetAlertService.confirmBox('¿Estás seguro?', 'No podrás revertir esta acción.')
      .then((result) => {
        if (result.isConfirmed) {
          this.isLoading = true;

          this.serverUser.delete(id).pipe(
            catchError((error) => {
              this.isLoading = false;
              const errorMessage = getErrorMessage(error);
              this.sweetAlertService.mostrarError(errorMessage);
              return of(null);
            })
          ).subscribe({
            next: (response: any) => {
              try {
                if (response && response.data) {
                  if (response.data.id === SessionService.usuario.id) {
                    SessionService.borrarSession();
                    this.router.navigate(['home']);
                    return;
                  }

                  this.usuario = response.data;
                  this.cargarEntidad();
                } else {

                }
              } catch (error) {

              } finally {
                this.isLoading = false;
              }
            },
            error: (error) => {

              this.isLoading = false;
            }
          });
        } else if (result.isDismissed) {

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
          this.isLoading = false;
        const errorMessage = getErrorMessage(error);
        this.sweetAlertService.mostrarError(errorMessage);
          return of(null);
        })
      ).subscribe(

    {next:
      (response: any) => {
      if (response?.data) {
        this.usuarios.push(response.data);
      }
    },

  error: (e) => {
        const errores = e.error?.errors || [];
const message = e.error?.message || [];
        const mensajeErrores = errores.join(', ');
        this.sweetAlertService.mostrarError(mensajeErrores +", "+ message);
    }

    }

    );
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
          this.isLoading = false;
        const errorMessage = getErrorMessage(error);
        this.sweetAlertService.mostrarError(errorMessage);
          return of(null);
        })
      ).subscribe(
    {
    next:
      (response: any) => {
      if (response?.data) {
        this.usuarios = this.usuarios.map(u => u.id === usuario.id ? response.data : u);

      }
    },
    error: (e) => {
      const errores = e.error?.errors || [];
const message = e.error?.message || [];
      const mensajeErrores = errores.join(', ');
      this.sweetAlertService.mostrarError(mensajeErrores +", "+ message);
  }

    }

    );
    }
  }

  specialFiltro(nombre: string, dato: any): string {
    return specialFiltro(nombre, dato);
  }
}
