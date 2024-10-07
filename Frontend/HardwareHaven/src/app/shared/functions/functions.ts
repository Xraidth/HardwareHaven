import { HttpHeaders } from "@angular/common/http";
import { SessionService } from "../../core/services/share/session.service";

export function specialFiltro(nombre: string, dato: any): string {
    if (nombre.includes("precios")) return `$${getMaxPrice(dato)}`;
    if (nombre.includes("categoria")) return dato.descripcion;
    if (nombre.includes("componente")) return dato.name;
    if (nombre.includes("componentes")) return Array.isArray(dato) ? (dato.length > 0 ? "Posee componentes" : "No posee componentes") : "-";
    if(nombre.includes("subTotal"))return `$${dato}`;
    if (nombre.includes("valor")) return `$${dato}`;
    if (nombre.includes("fechaDesde") || nombre.includes("fechaCompra")) return formatDateTime(dato);
    if(nombre.includes("fechaCancel")) return (dato) ? formatDateTime(dato): "-";
    if (nombre.includes("lineasCompras")) return Array.isArray(dato) ? (dato.length > 0 ? "Posee lineas" : "Vacia") : "-";
    if (nombre === "compra") return dato.id.toString();
    if (nombre === "user") return dato.name;
    if (nombre.includes("compras")) return Array.isArray(dato) ? (dato.length > 0 ? "Realizo compras" : "No compro") : "-";
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
  

export  function formatDateToYYYYMMDD(isoDate: string): string {
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`; 


}

 
 export function getHeaders(includeToken: boolean = true) {
  let headers = new HttpHeaders({
    'Content-Type': 'application/json; charset=UTF-8',
  });

  if (includeToken) {
    const token = SessionService.usuario.jwt || null;
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
  }

  return { headers };
}