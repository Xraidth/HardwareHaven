import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getHeaders } from '../../../shared/functions/functions';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:3000/api/user/';

  constructor(    
    private http: HttpClient
  ) { }


  getAll(){
    return this.http.get(`${this.baseUrl}getAll`,getHeaders(true));
  }

  
  getOne(id: number) {
    return this.http.get(`${this.baseUrl}getOne/${id}`, getHeaders(true));
  }

  create(body:{name:string, password:string, email:string, tipoUsuario:string}){
    const headers= new HttpHeaders({'Content-Type': 'application/json; charset=UTF-8'});
    return this.http.post(`${this.baseUrl}register`, body, getHeaders(false));
  }

  delete(id: number) {
    return this.http.delete(`${this.baseUrl}deleteOne/${id}`, getHeaders(true));
  }

  update( id: number, body:{ newPassword: string, oldPassword:string,newUserName:string, newEmail: string, newUserType:string}){
    const headers= new HttpHeaders({'Content-Type': 'application/json; charset=UTF-8'});
    return this.http.put(`${this.baseUrl}update/${id}`, body, getHeaders(true));
  }

  updateUserName( id: number, body:{ newUserName:string, password: string}){
    const headers= new HttpHeaders({'Content-Type': 'application/json; charset=UTF-8'});
    return this.http.put(`${this.baseUrl}updateUserName/${id}`, body, getHeaders(true));
  }
  updateUserPassword( id: number, body:{ newPassword: string, oldPassword:string}){
    const headers= new HttpHeaders({'Content-Type': 'application/json; charset=UTF-8'});
    return this.http.put(`${this.baseUrl}updatePassword/${id}`, body, getHeaders(true));
  }

  login(body:{name: string, password:string}){
    const headers= new HttpHeaders({'Content-Type': 'application/json; charset=UTF-8'});
    return this.http.post(`${this.baseUrl}login/`, body, getHeaders(false));
  }


}
