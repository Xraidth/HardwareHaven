import { Component, Input, OnInit} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SweetAlertService } from '../../core/services/notifications/sweet-alert.service';
import { SessionService } from '../../core/services/share/session.service';
import { UserService } from '../../core/services/entities/user.service';
import { HttpClientModule } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { getErrorMessage } from '../functions/functions';
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


  async configurarCuenta(): Promise<void> {
    const credenciales = await this.swa.mostrarConfigurarCuenta(this.usuario);
    if (credenciales) {
      this.serverUser.update(this.usuario.id, {
        newPassword: credenciales.newPassword,
        oldPassword: credenciales.oldPassword,
        newUserName: credenciales.newUserName,
        newEmail: credenciales.newEmail,
        newUserType: credenciales.newUserType
      }).pipe(
        catchError((error) => {

        const errorMessage = getErrorMessage(error);
        this.swa.showError(errorMessage);
          return of(null);
        })
      ).subscribe(
    {
    next:
      (response: any) => {
      if (response) {
        this.usuario = SessionService.saveSession(response.jwt, false);
        this.router.navigate(['profile']);
      }
    },
    error: (error) => {
      const errores = error.error.errors || [];
      const message = error.error.message || 'An unknown error occurred';
      const messageErrors = errores.join(', ');
      this.swa.showError(messageErrors ? messageErrors : message);
    }

    }

    );
    }
  }



  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  cerrarSesion(){
    SessionService.deleteSession();
  }
}
