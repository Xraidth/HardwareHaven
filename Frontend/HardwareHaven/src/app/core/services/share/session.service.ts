import { Injectable } from '@angular/core';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class SessionService {



  public static usuario:any;
  public static jwt:any;

  private static setUser():any
  {
    const decodificacion = this.decodificarJWT();
    this.usuario = decodificacion && decodificacion.user ? decodificacion.user : undefined;
    return this.usuario;
  }

  public static decodificarJWT(): any {

    if (this.jwt) {
      try {
        const decoded = jwtDecode(this.jwt);
        return decoded;
      } catch (error) {
        return undefined;
      }
    }
    return undefined;
  }




  public static guardarSession(jwt:any,recordarClave:boolean): any{
    this.jwt = jwt;
    const storage = recordarClave ? localStorage : sessionStorage;
    storage.setItem('jwt', JSON.stringify(jwt));
    return this.setUser();
  }



  public static recordarSession(): any {
    const token = localStorage.getItem('jwt') || sessionStorage.getItem('jwt');
    this.jwt = token ? JSON.parse(token) : null;
    return this.setUser();
  }

  public static borrarSession(): void {
      localStorage.removeItem('jwt');
      sessionStorage.removeItem('jwt');
      this.usuario = null;
      this.jwt = null;
  }
  public static guardarAvisoDeOferta(): void {
    sessionStorage.setItem('avisoOferta', JSON.stringify("OfertaMostrada"));
  }

  public static recordarOferta(): any {
    const item = sessionStorage.getItem('avisoOferta');
    if (item) {

      return JSON.parse(item);
    }
    return undefined;
  }

}
