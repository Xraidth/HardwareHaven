import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { formatDateToYYYYMMDD, getMaxPrice } from '../../../shared/functions/functions';



@Injectable({
  providedIn: 'root'
})
export class SweetAlertService {

  constructor() { }

  simpleAlert(message: string) {
    Swal.fire(message);
  }

  mostrarError(message: string): void {
    Swal.fire({
      title: 'Error',
      text: message,
      icon: 'error',
      confirmButtonText: 'OK',
      confirmButtonColor: '#d33',
    });
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
mostrarFormularioRegistro(): Promise<{username: string, password: string, email:string, userType:string} | undefined> {
    return Swal.fire({
      title: "Crea una cuenta",
      html: `
       <div class="container mt-4">
  <div class="row justify-content-center">
    <div class="col-md-6">
      <div class="mb-3">
        <input id="swal-input-username" class="form-control" placeholder="Nombre de usuario">
      </div>
      <div class="mb-3">
        <input id="swal-input-email" class="form-control" type="email" placeholder="Email">
      </div>
      <div class="mb-3">
        <input id="swal-input-password" type="password" class="form-control" placeholder="Contraseña">
      </div>
      <div class="mb-3">
        <input id="swal-input-confirm-password" type="password" class="form-control" placeholder="Confirmar contraseña">
      </div>
      <div class="mb-3">
        <select id="swal-input-user-type" class="form-select">
          <option value="Cliente">Cliente</option>
          <option value="Administrador">Administrador</option>
        </select>
      </div>
    </div>
  </div>
</div>

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
        const userType = (document.getElementById('swal-input-user-type') as HTMLSelectElement).value;
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
            email:email,
            userType: userType
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


  mostrarConfigurarCuenta(usuario: any): Promise<{newUserName: string, oldPassword: string, newPassword: string, newEmail:string, newUserType: string} | undefined> {
    return Swal.fire({
      title: "Configuración de cuenta",
      html: `
    <div class="container mt-4">
  <div class="row justify-content-center">
    <div class="col-md-6">
      <div class="mb-3">
        <input id="swal-input-username" class="form-control" placeholder="Nombre de usuario" value="${usuario.name || 'usuario'}">
      </div>
      <div class="mb-3">
        <input id="swal-input-email" class="form-control" placeholder="Email" value="${usuario.email || 'email'}">
      </div>
      <div class="mb-3">
        <input id="swal-input-password" type="password" class="form-control" placeholder="Nueva contraseña (opcional)">
      </div>
      <div class="mb-3">
        <input id="swal-input-confirm-password" type="password" class="form-control" placeholder="Confirmar nueva contraseña (opcional)">
      </div>
      <div class="mb-3">
        <select id="swal-input-user-type" class="form-select">
          <option value="cliente" ${usuario.tipoUsuario === 'cliente' ? 'selected' : ''}>Cliente</option>
          <option value="administrador" ${usuario.tipoUsuario === 'administrador' ? 'selected' : ''}>Administrador</option>
        </select>
      </div>
    </div>
  </div>
</div>
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
        const userType = (document.getElementById('swal-input-user-type') as HTMLSelectElement).value;

        if (!username) {
          Swal.showValidationMessage('Por favor, ingresa un nombre de usuario');
          return false;
        } else if (password && password !== confirmPassword) {
          Swal.showValidationMessage('Las contraseñas no coinciden');
          return false;
        } else if (!email) {
          Swal.showValidationMessage('Por favor, ingresa un email');
          return false;
          }
        else {
          return {
            newUserName: username,
            newPassword: password,
            oldPassword: usuario.password,
            newEmail: email,
            newUserType: userType
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
            <span class="fs-5 text-danger fw-semibold">$ ${getMaxPrice(producto.precios)}</span>
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
      title: "Crea una categoria",
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
      title: "Crea un precio",
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
      title: "Crea una linea de compra",
      html: `
       <input id="swal-input-compraId" class="swal2-input" placeholder="CompraId">
       <input id="swal-input-cantidad" class="swal2-input" placeholder="Cantidad">
       <input id="swal-input-componenteId" class="swal2-input" placeholder="ComponenteId">
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

updateCompra(compra:any): Promise<{
  userId: number,
  fechaCompra: Date,
  fechaCancel: Date|undefined,
  total: number} | undefined> {
    return Swal.fire({
      title: "Modificar una compra",
      html: `
       <div style="display: flex; flex-direction: column; gap: 15px;">
  <div style="display: flex; justify-content: space-between; align-items: center;">
    <label for="swal-input-fechaCompra" style="flex: 1;">Fecha de Compra:</label>
    <input id="swal-input-fechaCompra" class="swal2-input" type="date" placeholder="Fecha de Compra" value="${formatDateToYYYYMMDD(compra.fechaCompra)}" style="flex: 2;">
  </div>

  <div style="display: flex; justify-content: space-between; align-items: center;">
    <label for="swal-input-fechaCancel" style="flex: 1;">Fecha de Cancelación:</label>
    <input id="swal-input-fechaCancel" class="swal2-input" type="date" placeholder="Fecha de Cancelación"
    value="${compra.fechaCancel ? formatDateToYYYYMMDD(compra.fechaCancel) : ''}"
    }" style="flex: 2;">
  </div>

  <div style="display: flex; justify-content: space-between; align-items: center;">
    <label for="swal-input-total" style="flex: 1;">Total:</label>
    <input id="swal-input-total" class="swal2-input" placeholder="Total" value="${compra.total}" style="flex: 2;">
  </div>

  <div style="display: flex; justify-content: space-between; align-items: center;">
    <label for="swal-input-userId" style="flex: 1;">ID de Usuario:</label>
    <input id="swal-input-userId" class="swal2-input" placeholder="ID de Usuario" value="${compra.user.id}" style="flex: 2;">
  </div>
</div>

      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Insertar",
      cancelButtonText: "Cancelar",
      preConfirm: () => {
        const fechaCompra = (document.getElementById('swal-input-fechaCompra') as HTMLInputElement).value;
        const fechaCancel = (document.getElementById('swal-input-fechaCancel') as HTMLInputElement).value;
        const total = (document.getElementById('swal-input-total') as HTMLInputElement).value;
        const userId = (document.getElementById('swal-input-userId') as HTMLInputElement).value;

        if (!userId) {
          Swal.showValidationMessage('Por favor, ingresa un id de usuario valido');
          return false;
        }
        else if(!fechaCompra){
          Swal.showValidationMessage('Por favor, ingresa una fecha de compra valido');
          return false;
        }
        else if(!total){
          Swal.showValidationMessage('Por favor, ingresa un total valido');
          return false;
        }

         else {
          return {
            userId: userId,
            fechaCompra: fechaCompra,
            fechaCancel: fechaCancel||undefined,
            total: total,
          };
        }
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.alertWithSuccess('¡Compra Actualizada!',"Listo")
        return result.value;
      } else {
        return undefined;
      }
    });
  }


  updateComponente(componente:any): Promise<{name: string, description: string, categoriaId: number} | undefined> {
    return Swal.fire({
      title: "Modificar un componente",
      html: `
        <div style="display: flex; flex-direction: column; gap: 15px;">
  <div style="display: flex; justify-content: space-between; align-items: center;">
    <label for="swal-input-nameComponente" style="flex: 1;">Nombre del Componente:</label>
    <input id="swal-input-nameComponente" class="swal2-input" placeholder="Nombre del Componente" value="${componente.name}" style="flex: 2;">
  </div>

  <div style="display: flex; justify-content: space-between; align-items: center;">
    <label for="swal-input-descComponent" style="flex: 1;">Descripción del Componente:</label>
    <input id="swal-input-descComponent" class="swal2-input" placeholder="Descripción del Componente" value="${componente.description}" style="flex: 2;">
  </div>

  <div style="display: flex; justify-content: space-between; align-items: center;">
    <label for="swal-input-categoriaId" style="flex: 1;">ID de Categoría:</label>
    <input id="swal-input-categoriaId" class="swal2-input" placeholder="ID de Categoría" value="${componente.categoria.id}" style="flex: 2;">
  </div>
</div>

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
        this.alertWithSuccess('¡Componente Actualizado!',"Listo")
        return result.value;
      } else {
        return undefined;
      }
    });
  }



 updateCategoria(categoria:any): Promise<{description: string} | undefined> {
    return Swal.fire({
      title: "Modificar un categoira",
      html: `

        <div style="display: flex; flex-direction: column; gap: 15px;">
  <div style="display: flex; justify-content: space-between; align-items: center;">
    <label for="swal-input-descCategoria" style="flex: 1;">Descripción de la Categoría:</label>
    <input id="swal-input-descCategoria" class="swal2-input" placeholder="Descripción" value="${categoria.descripcion}" style="flex: 2;">
  </div>
</div>


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
        this.alertWithSuccess('¡Categoria Actualizada!',"Listo")
        return result.value;
      } else {
        return undefined;
      }
    });
  }


  updatePrecio(precio:any): Promise<{ fechaDesde: Date, componenteId: number, valor: number,} | undefined> {
    return Swal.fire({
      title: "Actualizar precio",
      html: `
        <div style="display: flex; flex-direction: column; gap: 15px;">
  <div style="display: flex; justify-content: space-between; align-items: center;">
    <label for="swal-input-fechaDesde" style="flex: 1;">Fecha Desde:</label>
    <input id="swal-input-fechaDesde" type="date" class="swal2-input" placeholder="Fecha Desde" value="${formatDateToYYYYMMDD(precio.fechaDesde)}" style="flex: 2;">
  </div>

  <div style="display: flex; justify-content: space-between; align-items: center;">
    <label for="swal-input-componenteId" style="flex: 1;">ID del Componente:</label>
    <input id="swal-input-componenteId" class="swal2-input" placeholder="ID del Componente" value="${precio.componente.id}" style="flex: 2;">
  </div>

  <div style="display: flex; justify-content: space-between; align-items: center;">
    <label for="swal-input-valor" style="flex: 1;">Valor:</label>
    <input id="swal-input-valor" class="swal2-input" placeholder="Valor" value="${precio.valor}" style="flex: 2;">
  </div>
</div>

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
        this.alertWithSuccess('¡Precio Actualizado!',"Listo")
        return result.value;
      } else {
        return undefined;
      }
    });
  }




  updateLineaCompra(linea:any): Promise<{ compraId: number, componenteId: number, cantidad: number, subTotal:number} | undefined> {
    return Swal.fire({
      title: "Crea un Linea de Compra",
      html: `
    <div style="display: flex; flex-direction: column; gap: 15px;">
  <div style="display: flex; justify-content: space-between; align-items: center;">
    <label for="swal-input-compraId" style="flex: 1;">ID de la Compra:</label>
    <input id="swal-input-compraId" class="swal2-input" placeholder="ID de la Compra" value="${linea.compra.id}" style="flex: 2;">
  </div>

  <div style="display: flex; justify-content: space-between; align-items: center;">
    <label for="swal-input-cantidad" style="flex: 1;">Cantidad:</label>
    <input id="swal-input-cantidad" class="swal2-input" placeholder="Cantidad" value="${linea.cantidad}" style="flex: 2;">
  </div>

  <div style="display: flex; justify-content: space-between; align-items: center;">
    <label for="swal-input-componenteId" style="flex: 1;">ID del Componente:</label>
    <input id="swal-input-componenteId" class="swal2-input" placeholder="ID del Componente" value="${linea.componente.id}" style="flex: 2;">
  </div>

  <div style="display: flex; justify-content: space-between; align-items: center;">
    <label for="swal-input-subTotal" style="flex: 1;">Subtotal:</label>
    <input id="swal-input-subTotal" class="swal2-input" placeholder="Subtotal" value="${linea.subTotal}" style="flex: 2;">
  </div>
</div>

      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Insertar",
      cancelButtonText: "Cancelar",
      preConfirm: () => {
        const compraId = (document.getElementById('swal-input-compraId') as HTMLInputElement).value;
        const componenteId = (document.getElementById('swal-input-componenteId') as HTMLInputElement).value;
        const cantidad = (document.getElementById('swal-input-cantidad') as HTMLInputElement).value;
        const subTotal = (document.getElementById('swal-input-subTotal') as HTMLInputElement).value;

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
        else if (!subTotal) {
          Swal.showValidationMessage('Por favor, ingresa un subTotal valida');
          return false;
        }
         else {
          return {
            compraId: compraId,
            componenteId: componenteId,
            cantidad: cantidad,
            subTotal: subTotal
          };
        }
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.alertWithSuccess('Linea de Compra Actualizada!',"Listo")
        return result.value;
      } else {
        return undefined;
      }
    });
  }










}
