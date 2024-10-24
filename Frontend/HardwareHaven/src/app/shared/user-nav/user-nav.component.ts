import { Component, Input, OnInit} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SweetAlertService } from '../../core/services/notifications/sweet-alert.service';
import { SessionService } from '../../core/services/share/session.service';
import { UserService } from '../../core/services/entities/user.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-user-nav',
  standalone: true,
  imports: [RouterModule, HttpClientModule],
  templateUrl: './user-nav.component.html',
  styleUrl: './user-nav.component.css',
  providers: [UserService]
})
export class UserNavComponent implements OnInit {


  @Input() usuario:any;
  public userName:string= "Usuario";
  isDropdownOpen = false;
  constructor(private swa:SweetAlertService,
    private serverUser: UserService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.userName = this.usuario ? this.truncateString(this.usuario.name) : "Usuario";
  }

  truncateString(str: string, maxLength: number = 8): string {
    if (str.length > maxLength) {
      return str.slice(0, maxLength) + '...';
    } else {
      return str;
    }
  }
  async configurarCuenta(){
    let credenciales = await this.swa.mostrarConfigurarCuenta(this.usuario);
    if (credenciales) {
      this.serverUser.update(
        SessionService.usuario.id,
        {
          newPassword: credenciales.newPassword,
          newUserName: credenciales.newUserName,
          oldPassword: credenciales.oldPassword,
          newEmail: credenciales.newEmail,
          newUserType: credenciales.newUserType
        }).subscribe({
        next: async (r: any) => {
          try {
            if (r && r.data) {
              const user: any = r.data;
              this.usuario = user;
              SessionService.usuario = await this.usuario;
              this.router.navigate(['home']);
            } else {

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


  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  cerrarSesion(){
    SessionService.borrarSession();
  }
}
