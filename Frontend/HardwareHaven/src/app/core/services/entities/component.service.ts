import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ComponentService  {

  private baseUrl = environment.baseUrl + 'api/componente/';

  constructor(
    private http: HttpClient
  ) { }
  getAll(){
    return this.http.get(`${this.baseUrl}getAll`);
  }
  getOne(id: number) {
    return this.http.get(`${this.baseUrl}getOne/${id}`);
  }

  create(body:{ name: string, description: string, categoriaId: number, imgURL:string|null}){

    return this.http.post(`${this.baseUrl}insert`, body);
  }

  delete(id: number) {
    return this.http.delete(`${this.baseUrl}deleteOne/${id}`);
  }

  update( id: number, body:{ newCompName:string, newDescription:string, categoriaId:number, newImgURL:string|null}){

    return this.http.put(`${this.baseUrl}update/${id}`, body);
  }
  updateDescription( id: number, body:{ newDescription:string, oldDescription: string}){

    return this.http.put(`${this.baseUrl}updateDescription/${id}`, body);
  }

  updateCompName( id: number, body:{newCompName: string}){

    return this.http.put(`${this.baseUrl}updateDescription/${id}`, body);
  }

}
