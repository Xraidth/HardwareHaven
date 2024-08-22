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

  








  InsertCompra(): Promise<{userId:number} | undefined> {
    return Swal.fire({
      title: "Crea una compra",
      html: `
        <input id="swal-input-userId" class="swal2-input" placeholder="id de usuario">
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Insertar",
      cancelButtonText: "Cancelar",
      preConfirm: () => {
        const userId = (document.getElementById('swal-input-userId') as HTMLInputElement).value;
        //Validar que el usuario este registrado
        if (!userId) {
          Swal.showValidationMessage('Por favor, ingresa un id de usuario valido');
          return false;
        }
         else {
          return {
            userId: userId,
          };
        }
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.alertWithSuccess('¡Compra creada!',"Listo")
        return result.value;
      } else {
        return undefined;
      }
    });
  }



  

  InsertComponente(): Promise<{name: string, description: string, categoriaId: number} | undefined> {
    return Swal.fire({
      title: "Crea un componente",
      html: `
        <input id="swal-input-nameComponente" class="swal2-input" placeholder="name">
        <input id="swal-input-descComponent" class="swal2-input" placeholder="description">
        <input id="swal-input-categoriaId" class="swal2-input" placeholder="categoriaId">
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Insertar",
      cancelButtonText: "Cancelar",
      preConfirm: () => {
        const name = (document.getElementById('swal-input-nameComponente') as HTMLInputElement).value;
        const description = (document.getElementById('swal-input-descComponent') as HTMLInputElement).value;
        const categoriaId = (document.getElementById('swal-input-categoriaId') as HTMLInputElement).value;
        
        if (!name) {
          Swal.showValidationMessage('Por favor, ingresa un name componente valido');
          return false;
        }
        else if (!description) {
          Swal.showValidationMessage('Por favor, ingresa una descripcion valida');
          return false;
        }
        else if (!categoriaId) {
          Swal.showValidationMessage('Por favor, ingresa una categoriaId valida');
          return false;
        }
         else {
          return {
            name: name,
            description: description,
            categoriaId: categoriaId
          };
        }
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.alertWithSuccess('¡Componente creado!',"Listo")
        return result.value;
      } else {
        return undefined;
      }
    });
  }


  
  InsertCategoria(): Promise<{description: string} | undefined> {
    return Swal.fire({
      title: "Crea un componente",
      html: `
        
        <input id="swal-input-descCategoria" class="swal2-input" placeholder="description">
        
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Insertar",
      cancelButtonText: "Cancelar",
      preConfirm: () => {
        const description = (document.getElementById('swal-input-descCategoria') as HTMLInputElement).value;
        
        if (!description) {
          Swal.showValidationMessage('Por favor, ingresa una descripcion valida');
          return false;
        }
         else {
          return {
            description: description,
          };
        }
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.alertWithSuccess('¡Categoria creada!',"Listo")
        return result.value;
      } else {
        return undefined;
      }
    });
  }


  InsertPrecio(): Promise<{ fechaDesde: Date, componenteId: number, valor: number,} | undefined> {
    return Swal.fire({
      title: "Crea un componente",
      html: `
        <input id="swal-input-fechaDesde" type="date" class="swal2-input" placeholder="fechaDesde">
        <input id="swal-input-componenteId" class="swal2-input" placeholder="Componente Id">
        <input id="swal-input-valor" class="swal2-input" placeholder="Valor">
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Insertar",
      cancelButtonText: "Cancelar",
      preConfirm: () => {
        const fechaDesde = (document.getElementById('swal-input-fechaDesde') as HTMLInputElement).value;
        const componenteId = (document.getElementById('swal-input-componenteId') as HTMLInputElement).value;
        const valor = (document.getElementById('swal-input-valor') as HTMLInputElement).value;
        
        if (!fechaDesde) {
          Swal.showValidationMessage('Por favor, ingresa una fecha desde valido');
          return false;
        } else if (!componenteId) {
          Swal.showValidationMessage('Por favor, ingresa un componente valido');
          return false;
        }else if (!valor) {
          Swal.showValidationMessage('Por favor, ingresa un valor valido');
          return false;
        }
         else {
          return {
            fechaDesde: fechaDesde,
            componenteId: componenteId,
            valor: valor,
          };
        }
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.alertWithSuccess('¡Precio creado!',"Listo")
        return result.value;
      } else {
        return undefined;
      }
    });
  }



  
  InsertLineaCompra(): Promise<{ compraId: number, componenteId: number, cantidad: number,} | undefined> {
    return Swal.fire({
      title: "Crea un componente",
      html: `
       <input id="swal-input-compraId" class="swal2-input" placeholder="Compra Id">
       <input id="swal-input-cantidad" class="swal2-input" placeholder="Cantidad">
       <input id="swal-input-componenteId" class="swal2-input" placeholder="Componente Id">
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Insertar",
      cancelButtonText: "Cancelar",
      preConfirm: () => {
        const compraId = (document.getElementById('swal-input-compraId') as HTMLInputElement).value;
        const componenteId = (document.getElementById('swal-input-componenteId') as HTMLInputElement).value;
        const cantidad = (document.getElementById('swal-input-cantidad') as HTMLInputElement).value;
        
        if (!compraId) {
          Swal.showValidationMessage('Por favor, ingresa una compra valida');
          return false;
        } else if (!componenteId) {
          Swal.showValidationMessage('Por favor, ingresa un componente valido');
          return false;
        }else if (!cantidad) {
          Swal.showValidationMessage('Por favor, ingresa una cantidad valida');
          return false;
        }
         else {
          return {
            compraId: compraId,
            componenteId: componenteId,
            cantidad: cantidad,
          };
        }
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.alertWithSuccess('¡Precio creado!',"Listo")
        return result.value;
      } else {
        return undefined;
      }
    });
  }

  


}
