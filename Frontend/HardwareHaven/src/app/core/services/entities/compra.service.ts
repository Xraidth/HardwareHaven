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
    const headers= new HttpHeaders({'Content-Type': 'application/json; charset=UTF-8'});
    return this.http.post(`${this.baseUrl}insert`, body, { headers });
  }

  delete(id: number) {
    return this.http.delete(`${this.baseUrl}deleteOne/${id}`);
  }

  update( id: number, body:{fechaCompra: Date, fechaCancel: Date| undefined, total: number}){ 
    const headers= new HttpHeaders({'Content-Type': 'application/json; charset=UTF-8'});
    return this.http.put(`${this.baseUrl}update/${id}`, body, { headers });
  }
  facturate(id: number) {
    const headers = new HttpHeaders({'Content-Type': 'application/json; charset=UTF-8'});
    return this.http.patch(`${this.baseUrl}Facturate/${id}`, {}, { headers });
}

}
