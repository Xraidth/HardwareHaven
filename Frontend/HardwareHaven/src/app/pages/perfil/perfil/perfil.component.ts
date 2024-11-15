import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../../core/services/share/session.service';
import { UserNavComponent } from '../../../shared/user-nav/user-nav.component';
import { Router } from '@angular/router';
import { SweetAlertService } from '../../../core/services/notifications/sweet-alert.service';
import { catchError, map, share } from 'rxjs/operators';
import { of, Subscription } from 'rxjs';
import { UserService } from '../../../core/services/entities/user.service';
import { directed, getErrorMessage } from '../../../shared/functions/functions';


@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [UserNavComponent],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css',
  providers:[SweetAlertService, UserService]
})
export class PerfilComponent implements OnInit {
public usuario:any;
public username: string = 'Usuario123';


  constructor(private router: Router, private sweetAlertService: SweetAlertService, private serverUser: UserService){}
  ngOnInit(): void {
  this.usuario = SessionService.usuario;
}

goBack() {
  directed(this.usuario.tipoUsuario, this.router)
}

borrarCuenta(){
  if(this.usuario){
  this.sweetAlertService.confirmBox('¿Estás seguro?', 'No podrás revertir esta acción.').then((result) => {
    if (result.isConfirmed) {
      this.serverUser.delete(this.usuario.id).pipe(
        map((response: any) => {
          if (response) {
            this.sweetAlertService.simpleAlert("Su cuenta fue eliminada, gracias por comprar en Hardware Haven");
            return response;
          } else {
            console.log('El objeto recibido no tiene la estructura esperada.');
            return null;
          }
        }),
        catchError((error) => {
          const errorMessage = getErrorMessage(error);
          this.sweetAlertService.mostrarError(errorMessage);
          return of(null);
        })
      ).subscribe((usuario: any) => {
        if (usuario) {
          this.usuario = usuario;
          this.router.navigate(['/home']);
        }
      });
    } else if (result.isDismissed) {
      console.log('El usuario canceló la eliminación.');
    }
  });
}
}
}
