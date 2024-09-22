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
    this.sweetAlertService.confirmBox('¿Estás seguro?', 'No podrás revertir esta acción.').then((result) => {
      if (result.isConfirmed) {
        this.serverUser.delete(id).pipe(
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
        ).subscribe((usuario: any) => {
          if (usuario) {
            this.usuario = usuario;
            this.cargarEntidad();  
          }
        });
      } else if (result.isDismissed) {
        console.log('El usuario canceló la eliminación.');
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
          this.isLoading = false;
        const errorMessage = getErrorMessage(error);
        this.sweetAlertService.mostrarError(errorMessage); 
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
