import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = environment.baseUrl + 'api/user/';

  constructor(
    private http: HttpClient
  ) { }


  getAll(){
    return this.http.get(`${this.baseUrl}getAll`);
  }


  getOne(id: number) {
    return this.http.get(`${this.baseUrl}getOne/${id}`);
  }

  create(body:{name:string, password:string, email:string, tipoUsuario:string}){

    return this.http.post(`${this.baseUrl}register`, body);
  }

  delete(id: number) {
    return this.http.delete(`${this.baseUrl}deleteOne/${id}`);
  }

  update( id: number, body:{ newPassword: string, oldPassword:string,newUserName:string, newEmail: string, newUserType:string}){

    return this.http.put(`${this.baseUrl}update/${id}`, body);
  }

  updateUserName( id: number, body:{ newUserName:string, password: string}){

    return this.http.patch(`${this.baseUrl}updateUserName/${id}`, body);
  }
  updateUserPassword( id: number, body:{ newPassword: string, oldPassword:string}){

    return this.http.patch(`${this.baseUrl}updatePassword/${id}`, body);
  }

  login(body:{name: string, password:string}){

    return this.http.post(`${this.baseUrl}login/`, body);
  }








}
