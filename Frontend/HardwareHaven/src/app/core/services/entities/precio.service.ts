import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { getHeaders } from '../../../shared/functions/functions';

@Injectable({
  providedIn: 'root'
})
export class PrecioService {

  private baseUrl = 'http://localhost:3000/api/precio/';
  constructor(    
    private http: HttpClient
  ) { }
  getAll(){
    return this.http.get(`${this.baseUrl}getAll`, getHeaders(true));
  }
  getOne(id: number) {
    return this.http.get(`${this.baseUrl}getOne/${id}`, getHeaders(true));
  }

  create(body:{ fechaDesde:Date, componenteId:number, valor:number}){
    const headers= new HttpHeaders({'Content-Type': 'application/json; charset=UTF-8'});
    return this.http.post(`${this.baseUrl}insert`, body, getHeaders(true));
  }

  delete(id: number) {
    return this.http.delete(`${this.baseUrl}deleteOne/${id}`, getHeaders(true));
  }

  update( id: number, body:{fechaDesde:Date, componenteId:number, valor:number}){ 
    const headers= new HttpHeaders({'Content-Type': 'application/json; charset=UTF-8'});
    return this.http.put(`${this.baseUrl}update/${id}`, body, getHeaders(true));
  }
}
