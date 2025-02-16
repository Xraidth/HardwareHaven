import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class CompraService {


  private baseUrl = 'http://localhost:3000/api/compra/';

  constructor(
    private http: HttpClient
  ) { }
  getAll(){
    return this.http.get(`${this.baseUrl}getAll`);
  }


  getOne(id: number) {
    return this.http.get(`${this.baseUrl}getOne/${id}`);
  }

  create(body:{ userId: number}){
    return this.http.post(`${this.baseUrl}insert`, body);
  }

  delete(id: number) {
    return this.http.delete(`${this.baseUrl}deleteOne/${id}`);
  }

  update(id: number, body: { fechaCompra: Date, fechaCancel?: Date | null, total: number }) {
    const bodyCopy = { ...body };
    if (!bodyCopy.fechaCancel) {
      delete bodyCopy.fechaCancel;
    }
    return this.http.put(`${this.baseUrl}update/${id}`, body);
  }

  facturate(id: number) {
    return this.http.get<Blob>(`${this.baseUrl}facturateWeb/${id}`, {
      responseType: 'blob' as 'json',  // Esto indica que la respuesta será un blob, no un JSON
    });
  }
}
