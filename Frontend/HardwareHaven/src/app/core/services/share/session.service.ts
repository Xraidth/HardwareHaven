import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor() { }

  public static usuario:any

  public static guardarSession(): void {
    localStorage.setItem('Usuario', JSON.stringify(this.usuario));
  }

  public static recordarSession(): any {
    const item = localStorage.getItem('Usuario');
    if (item) {
      this.usuario = JSON.parse(item);
      return this.usuario;
    }
    return undefined;
  }

  public static borrarSession(): void {
    localStorage.removeItem('Usuario');
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
