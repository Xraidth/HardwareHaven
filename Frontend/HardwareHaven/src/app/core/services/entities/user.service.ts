import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getHeadersFetch } from '../../../shared/functions/functions';
import { firstValueFrom, map } from 'rxjs';



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

    return this.http.put(`${this.baseUrl}updateUserName/${id}`, body);
  }
  updateUserPassword( id: number, body:{ newPassword: string, oldPassword:string}){

    return this.http.put(`${this.baseUrl}updatePassword/${id}`, body);
  }

  login(body:{name: string, password:string}){

    return this.http.post(`${this.baseUrl}login/`, body);
  }

 loginFetch(body: { name: string; password: string }) {
    const url = `${this.baseUrl}login/`;
    const headers = getHeadersFetch(false);

    return fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(body),
    });

  }

  createFetch(body:{name:string, password:string, email:string, tipoUsuario:string}){
    const url = `${this.baseUrl}register/`;
    const headers = getHeadersFetch(false);
    return fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(body),
    });
  }

  deleteFetch(id: number){
    const url = `${this.baseUrl}deleteOne/${id}`;
    const headers = getHeadersFetch(true);
    return fetch(url, {
      method: 'DELETE',
      headers: headers
    });
  }




}
