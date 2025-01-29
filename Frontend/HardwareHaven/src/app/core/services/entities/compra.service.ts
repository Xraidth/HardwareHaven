import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { getHeaders, getHeadersFetch, getHeadersFetchWeb } from '../../../shared/functions/functions';


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
    return this.http.post(`${this.baseUrl}insert`, body, getHeaders(true));
  }

  delete(id: number) {
    return this.http.delete(`${this.baseUrl}deleteOne/${id}`, getHeaders(true));
  }

  update(id: number, body: { fechaCompra: Date, fechaCancel?: Date | null, total: number }) {
    const bodyCopy = { ...body };
    if (!bodyCopy.fechaCancel) {
      delete bodyCopy.fechaCancel;
    }
    return this.http.put(`${this.baseUrl}update/${id}`, body, getHeaders(true));
  }

  facturate(id: number) {
    return this.http.patch(`${this.baseUrl}facturate/${id}`, {}, getHeaders(true));
}

facturateWeb(id: number) {
  //return this.http.get(`${this.baseUrl}facturateWeb/${id}`, {}, getHeaders(true));
}



facturatePromise(id: number) {
  return fetch(`${this.baseUrl}facturate/${id}`, {
    method: 'PATCH',
    headers: getHeadersFetch(true),
  });
}

facturateWebPromise(id: number) {
  return fetch(`${this.baseUrl}facturateWeb/${id}`, {
    method: 'GET',
    headers: getHeadersFetchWeb(true),
  });
}



}
