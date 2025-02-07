import { HttpInterceptorFn } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

export const interceptorInterceptor: HttpInterceptorFn = (req, next) => {
  let headers = new HttpHeaders();

  // Agregar encabezados comunes para todas las solicitudes
  headers = headers.set('Content-Type', 'application/json; charset=UTF-8');

  // Lógica para solicitudes que requieren autenticación o encabezados adicionales
  if (req.method === 'POST' || req.method === 'PUT') {
    // Agregar encabezado de autorización
    headers = headers.set('Authorization', 'Bearer my-token');
  }

  // Convertir HttpHeaders a un objeto simple
  const headersObject: { [key: string]: string } = {};
  headers.keys().forEach(key => {
    headersObject[key] = headers.get(key) || '';  // Asignar cada valor del encabezado
  });

  // Clonamos la solicitud original y añadimos los nuevos encabezados
  const clonedReq = req.clone({ setHeaders: headersObject });

  return next(clonedReq);
};
