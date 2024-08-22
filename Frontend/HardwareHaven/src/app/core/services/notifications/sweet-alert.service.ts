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
mostrarFormularioRegistro(): Promise<{username: string, password: string, email:string} | undefined> {
    return Swal.fire({
      title: "Crea una cuenta",
      html: `
        <input id="swal-input-username" class="swal2-input" placeholder="Nombre de usuario">
        <input id="swal-input-email" class="swal2-input" type="email" class="swal2-email" placeholder="email">
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
        const email = (document.getElementById('swal-input-email') as HTMLInputElement).value;
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
        } else if (!email) {
        Swal.showValidationMessage('Por favor, ingresa un email');
        return false;
        }
         else {
          return {
            username: username,
            password: password,
            email:email
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


  mostrarConfigurarCuenta(usuario: any): Promise<{newUserName: string, oldPassword: string, newPassword: string, newEmail:string} | undefined> {
    return Swal.fire({
      title: "Configura tu cuenta",
      html: `
        <input id="swal-input-username" class="swal2-input" placeholder="Nombre de usuario" value="${usuario.name||"usuario"}">
        <input id="swal-input-email" class="swal2-input" placeholder="email" value="${usuario.email||"email"}">
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
        const email = (document.getElementById('swal-input-email') as HTMLInputElement).value;
        const confirmPassword = (document.getElementById('swal-input-confirm-password') as HTMLInputElement).value;
  
        if (!username) {
          Swal.showValidationMessage('Por favor, ingresa un nombre de usuario');
          return false;
        } else if (password && password !== confirmPassword) {
          Swal.showValidationMessage('Las contraseñas no coinciden');
          return false;
        } else if (!email) {
          Swal.showValidationMessage('Por favor, ingresa un email');
          return false;
          } else {
          return {
            newUserName: username,
            newPassword: password,
            oldPassword: usuario.password,
            newEmail: email
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
  
  mostrarDetalleProducto(producto: any) {
    return Swal.fire({
      title: producto.name,
      html: `
        <div class="text-center">
          <img src="${producto.imageUrl}" class="img-fluid rounded-top mb-3" style="max-width: 150px;" alt="Imagen del producto">
          <div class="d-flex flex-column justify-content-center align-items-center bg-light p-3 rounded-bottom shadow-sm">
            <p class="mb-1 fw-bold text-dark">${producto.description}</p>
            <p class="mb-2 text-muted">${producto.categoria.descripcion}</p>
            <span class="fs-5 text-danger fw-semibold">$ ${this.getMaxPrice(producto.precios)}</span>
          </div>
        </div>
      `,
      showConfirmButton: false,  
      focusConfirm: false,
      showCancelButton: false,   
    });
  }
  

  recibirOfertas() {
    return Swal.fire({
      title: "¿Deseas recibir ofertas?",
      html: `
        <div class="text-center">
         <img src="../../../../assets/images/ofertas.png" class="img-fluid rounded-top mb-3" style="max-width: 300px;" alt="Imagen del producto">
          <input type="email" id="email" class="swal2-input" placeholder="Ingresa su email">
        </div>
      `,
      showConfirmButton: true,  
      confirmButtonText: 'Enviar',
      focusConfirm: false,
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        const email = (document.getElementById('email') as HTMLInputElement).value;
        if (!email) {
          Swal.showValidationMessage('Por favor, ingrese un email válido');
          return false;
        }
        return email;
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const email = result.value;
        console.log('Email ingresado:', email); //luego hacer algo con el email
      }
    });
  }
  




  getMaxPrice(precios: any[]): number {
    precios.sort((a, b) => {
      if (a.fecha && b.fecha) {
        return b.fecha.getTime() - a.fecha.getTime();
      }
      return 0; 
    });
    return precios[0]?.valor || 0;
  }  

  


}
