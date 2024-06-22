import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http/index.js';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:3000/api/user/';

  constructor(    
    private http: HttpClient
  ) { }


  getAll(){
    return this.http.get(`${this.baseUrl}getAll`);
  }

  
  getOne(id: number) {
    return this.http.get(`${this.baseUrl}getOne/${id}`);
  }

  register(new_user:{name:string, password:string}){
    const headers= new HttpHeaders({'Content-Type': 'application/json; charset=UTF-8'});
    return this.http.post(`${this.baseUrl}register`, new_user, { headers });
  }

  delete(id: number) {
    return this.http.delete(`${this.baseUrl}deleteOne/${id}`);
  }

  update( id: number, usertoUpdate:{ newPassword: string, oldPassword:string,newUserName:string}){
    const headers= new HttpHeaders({'Content-Type': 'application/json; charset=UTF-8'});
    return this.http.put(`${this.baseUrl}update/${id}`, usertoUpdate, { headers });
  }

  updateUserName( id: number, usertoUpdate:{ newUserName:string, password: string}){
    const headers= new HttpHeaders({'Content-Type': 'application/json; charset=UTF-8'});
    return this.http.put(`${this.baseUrl}update/${id}`, usertoUpdate, { headers });
  }
  updateUserPassword( id: number, usertoUpdate:{ newPassword: string, oldPassword:string}){
    const headers= new HttpHeaders({'Content-Type': 'application/json; charset=UTF-8'});
    return this.http.put(`${this.baseUrl}update/${id}`, usertoUpdate, { headers });
  }


}
