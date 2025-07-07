import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OpenClassService {
private AIUrl = environment.AIUrl;
  constructor(
      private http: HttpClient
    ) { }

chat(body:{
    message:string
  }){
    return this.http.post(`${this.AIUrl}chat`, body);
  }

}
