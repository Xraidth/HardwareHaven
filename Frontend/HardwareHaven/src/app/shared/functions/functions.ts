import { HttpHeaders } from "@angular/common/http";
import { SessionService } from "../../core/services/share/session.service";
import { Router } from "@angular/router";

export function specialFilter(name: string, dato: any): string {
    if (name.includes("precios")) return `$${getMaxPrice(dato)}`;
    if (name.includes("categoria")) return dato.descripcion;
    if (name.includes("componente")) return dato.name;
    if (name.includes("componentes")) return Array.isArray(dato) ? (dato.length > 0 ? "Posee componentes" : "No posee componentes") : "-";
    if(name.includes("subTotal"))return `$${dato}`;
    if (name.includes("valor")) return `$${dato}`;
    if (name.includes("fechaDesde") || name.includes("fechaCompra")) return formatDateTime(dato);
    if(name.includes("fechaCancel")) return (dato) ? formatDateTime(dato): "-";
    if (name.includes("lineasCompras")) return Array.isArray(dato) ? (dato.length > 0 ? "Posee lineas" : "Vacia") : "-";
    if (name === "compra") return dato.id.toString();
    if (name === "user") return dato.name;
    if (name.includes("compras")) return Array.isArray(dato) ? (dato.length > 0 ? "Realizo compras" : "No compro") : "-";
    return dato;
  }

  export function formatDateTime(isoString: string): string {
    const date = new Date(isoString);
    return date.toLocaleString('es-ES', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  }

  export function getMaxPrice(precios: any[]): number {
    precios.sort((a, b) => b.fecha?.getTime() - a.fecha?.getTime() || 0);
    return precios[0]?.valor || 0;
  }


  export function capitalizeFirstLetterOfEachWord(column: string): string {
    return column.split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
  export function getErrorMessage(error: any): string {
    if (error.error && error.error.message) {
      return error.error.message;
    } else if (error.status) {
      return `Error ${error.status}: ${error.statusText}`;
    } else {
      return 'Error desconocido. Inténtalo más tarde.';
    }
  }

 export function getHeaders(includeToken: boolean = true) {
  let headers = new HttpHeaders({
    'Content-Type': 'application/json; charset=UTF-8',
  });

  if (includeToken) {
    const token = SessionService.jwt || null;
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
  }

  return { headers };
}

export function directed(tipoUsuario: string, router:Router){
  if(tipoUsuario =="Administrador"){
    router.navigate(['inventario']);
  }
  else if (tipoUsuario =="Cliente"){
    router.navigate(['productList']);
  }
}
