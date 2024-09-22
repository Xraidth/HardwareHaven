import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { getHeaders } from '../../../shared/functions/functions';

@Injectable({
  providedIn: 'root'
})
export class ComponenteService {

  private baseUrl = 'http://localhost:3000/api/componente/';

  constructor(    
    private http: HttpClient
  ) { }
  getAll(){
    return this.http.get(`${this.baseUrl}getAll`, getHeaders(true));
  }
  getOne(id: number) {
    return this.http.get(`${this.baseUrl}getOne/${id}`, getHeaders(true));
  }

  create(body:{ name: string, description: string, categoriaId: number}){ 
    const headers= new HttpHeaders({'Content-Type': 'application/json; charset=UTF-8'});
    return this.http.post(`${this.baseUrl}insert`, body, getHeaders(true));
  }

  delete(id: number) {
    return this.http.delete(`${this.baseUrl}deleteOne/${id}`, getHeaders(true));
  }

  update( id: number, body:{ newCompName:string, newDescription:string, categoriaId:number}){ 
    const headers= new HttpHeaders({'Content-Type': 'application/json; charset=UTF-8'});
    return this.http.put(`${this.baseUrl}update/${id}`, body, getHeaders(true));
  }
  updateDescription( id: number, body:{ newDescription:string, oldDescription: string}){ 
    const headers= new HttpHeaders({'Content-Type': 'application/json; charset=UTF-8'});
    return this.http.put(`${this.baseUrl}updateDescription/${id}`, body, getHeaders(true));
  }

  updateCompName( id: number, body:{newCompName: string}){ 
    const headers= new HttpHeaders({'Content-Type': 'application/json; charset=UTF-8'});
    return this.http.put(`${this.baseUrl}updateDescription/${id}`, body, getHeaders(true));
  }

}
