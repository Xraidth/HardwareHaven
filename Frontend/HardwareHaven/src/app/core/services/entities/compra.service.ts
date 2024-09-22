import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { getHeaders } from '../../../shared/functions/functions';


@Injectable({
  providedIn: 'root'
})
export class CompraService {


  private baseUrl = 'http://localhost:3000/api/compra/';

  constructor(    
    private http: HttpClient
  ) { }
  getAll(){
    return this.http.get(`${this.baseUrl}getAll`, getHeaders(true));
  }

  
  getOne(id: number) {
    return this.http.get(`${this.baseUrl}getOne/${id}`, getHeaders(true));
  }

  create(body:{ userId: number}){
    const headers= new HttpHeaders({'Content-Type': 'application/json; charset=UTF-8'});
    return this.http.post(`${this.baseUrl}insert`, body, getHeaders(true));
  }

  delete(id: number) {
    return this.http.delete(`${this.baseUrl}deleteOne/${id}`, getHeaders(true));
  }

  update( id: number, body:{fechaCompra: Date, fechaCancel: Date| undefined, total: number}){ 
    const headers= new HttpHeaders({'Content-Type': 'application/json; charset=UTF-8'});
    return this.http.put(`${this.baseUrl}update/${id}`, body, getHeaders(true));
  }
  facturate(id: number) {
    const headers = new HttpHeaders({'Content-Type': 'application/json; charset=UTF-8'});
    return this.http.patch(`${this.baseUrl}facturate/${id}`, {}, getHeaders(true));
}

}
