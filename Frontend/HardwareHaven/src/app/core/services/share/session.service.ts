import { Injectable } from '@angular/core';
import jwt, { decode } from 'jsonwebtoken';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor() { }

  public static usuario:any;
  private static jwt:any;
  private static recordarClave: boolean = false;



  public static decodificarJWT(): any {

    if (this.jwt) {
      try {
        const decoded = jwt.decode(this.jwt);
        return decoded;
      } catch (error) {
        console.error("Error al decodificar el JWT:", error);
        return undefined;
      }
    }
    return undefined;
  }




  public static guardarSession(jwt:any,recordarClave:boolean): void {
    this.recordarClave = recordarClave;
    this.jwt = jwt;

    if(recordarClave){
      localStorage.setItem('jwt', JSON.stringify(this.jwt));
      localStorage.setItem('recordarClave', JSON.stringify(this.recordarClave));
    }
    else{
      sessionStorage.setItem('jwt', JSON.stringify(this.jwt));
      sessionStorage.setItem('recordarClave', JSON.stringify(this.recordarClave));
    }

  }



  public static recordarSession(): any {

    const recordarClaveSession = JSON.parse(sessionStorage.getItem('recordarClave')|| "false");
    const recordarClaveLocal = JSON.parse(localStorage.getItem('recordarClave')|| "false");

    let item:any ;

    if(recordarClaveLocal){
      this.recordarClave = recordarClaveLocal;
      this.jwt = JSON.parse(localStorage.getItem('jwt')||"null");
    }else if(recordarClaveSession){
      this.recordarClave = recordarClaveSession;
      this.jwt = JSON.parse(sessionStorage.getItem('jwt')||"null");
    }else{
      console.log("Error al recordar session")
    }

    this.usuario = this.decodificarJWT();
    if (!this.usuario) console.error("Error en decodificación:", this.usuario);
  }




  public static borrarSession(): void {

    if(this.recordarClave){
      localStorage.removeItem('jwt');
      localStorage.removeItem('recordarClave');
    }
    else{
      sessionStorage.removeItem('jwt');
      sessionStorage.removeItem('recordarClave');
    }
    this.usuario = null;
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
