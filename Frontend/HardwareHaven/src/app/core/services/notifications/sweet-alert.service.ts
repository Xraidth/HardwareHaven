import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SweetAlertService {

  constructor() { }

  simpleAlert(message: string) {
    Swal.fire(message);
  }

  alertWithSuccess(title: string, message: string) {
    Swal.fire(title, message, 'success');
  }

  confirmBox(title: string, text: string) {
    return Swal.fire({
      title: title,
      text: text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminarlo',
      cancelButtonText: 'No, conservarlo'
    });
  }
mostrarFormularioRegistro(): Promise<{username: string, password: string} | undefined> {
    return Swal.fire({
      title: "Crea tu cuenta",
      html: `
        <input id="swal-input-username" class="swal2-input" placeholder="Nombre de usuario">
        <input id="swal-input-password" type="password" class="swal2-input" placeholder="Contraseña">
        <input id="swal-input-confirm-password" type="password" class="swal2-input" placeholder="Confirmar contraseña">
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Registrarse",
      cancelButtonText: "Cancelar",
      preConfirm: () => {
        const username = (document.getElementById('swal-input-username') as HTMLInputElement).value;
        const password = (document.getElementById('swal-input-password') as HTMLInputElement).value;
        const confirmPassword = (document.getElementById('swal-input-confirm-password') as HTMLInputElement).value;

        if (!username) {
          Swal.showValidationMessage('Por favor, ingresa un nombre de usuario');
          return false;
        } else if (!password) {
          Swal.showValidationMessage('Por favor, ingresa una contraseña');
          return false;
        } else if (password !== confirmPassword) {
          Swal.showValidationMessage('Las contraseñas no coinciden');
          return false;
        } else {
          return {
            username: username,
            password: password
          };
        }
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.alertWithSuccess('¡Cuenta creada!',
          `Nombre de usuario: ${result.value.username} registrado`)

        
        return result.value;
      } else {
        return undefined;
      }
    });
  }


  mostrarConfigurarCuenta(usuario: any): Promise<{newUserName: string, oldPassword: string, newPassword: string} | undefined> {
    return Swal.fire({
      title: "Configura tu cuenta",
      html: `
        <input id="swal-input-username" class="swal2-input" placeholder="Nombre de usuario" value="${usuario.name||"usuario"}">
        <input id="swal-input-password" type="password" class="swal2-input" placeholder="Nueva contraseña (opcional)">
        <input id="swal-input-confirm-password" type="password" class="swal2-input" placeholder="Confirmar nueva contraseña (opcional)">
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Guardar cambios",
      cancelButtonText: "Cancelar",
      preConfirm: () => {
        const username = (document.getElementById('swal-input-username') as HTMLInputElement).value;
        const password = (document.getElementById('swal-input-password') as HTMLInputElement).value;
        const confirmPassword = (document.getElementById('swal-input-confirm-password') as HTMLInputElement).value;
  
        if (!username) {
          Swal.showValidationMessage('Por favor, ingresa un nombre de usuario');
          return false;
        } else if (password && password !== confirmPassword) {
          Swal.showValidationMessage('Las contraseñas no coinciden');
          return false;
        } else {
          return {
            newUserName: username,
            newPassword: password,
            oldPassword: password,
          };
        }
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.alertWithSuccess('¡Cuenta actualizada!',
          `Nombre de usuario: ${result.value.username} actualizado`);
  
        return result.value;
      } else {
        return undefined;
      }
    });
  }
  
  


}
