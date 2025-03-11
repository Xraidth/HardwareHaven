import { Injectable } from '@angular/core';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class SessionService {



  public static user:any;
  public static jwt:any;
  public static shopcar:any;

  private static setUser():any
  {
    const decoding = this.decodingJWT();
    this.user = decoding && decoding.user ? decoding.user : undefined;
    return this.user;
  }

  public static decodingJWT(): any {

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




  public static saveSession(jwt:any,rememberKey:boolean): any{
    this.jwt = jwt;
    const storage = rememberKey ? localStorage : sessionStorage;
    storage.setItem('jwt', JSON.stringify(jwt));
    return this.setUser();
  }



  public static rememberSession(): any {
    const token = localStorage.getItem('jwt') || sessionStorage.getItem('jwt');
    this.jwt = token ? JSON.parse(token) : null;
    return this.setUser();
  }

  public static deleteSession(): void {
      localStorage.removeItem('jwt');
      sessionStorage.removeItem('jwt');
      this.user = null;
      this.jwt = null;
  }
  public static saveOfferNotice(): void {
    sessionStorage.setItem('offerNotice', JSON.stringify("OfferShown"));
}

public static rememberOffer(): any {
    const item = sessionStorage.getItem('offerNotice');
    if (item) {
        return JSON.parse(item);
    }
    return undefined;
}


}
