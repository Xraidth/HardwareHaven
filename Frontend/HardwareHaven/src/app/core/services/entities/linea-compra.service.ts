import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class LineaCompraService {

  private baseUrl = 'http://localhost:3000/api/lineaCompra/';

  constructor(
    private http: HttpClient
  ) { }
  getAll(){
    return this.http.get(`${this.baseUrl}getAll`);
  }

  getOne(id: number) {
    return this.http.get(`${this.baseUrl}getOne/${id}`);
  }

  create(body:{ compraId: number, cantidad: number, componenteId: number }){

    return this.http.post(`${this.baseUrl}insert`, body);
  }

  delete(id: number) {
    return this.http.delete(`${this.baseUrl}deleteOne/${id}`);
  }

  update( id: number, body:{ compraId: number, cantidad: number, subTotal: number, componenteId: number }){

    return this.http.put(`${this.baseUrl}update/${id}`, body);
  }
}
