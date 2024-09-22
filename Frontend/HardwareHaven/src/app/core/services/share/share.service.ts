import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ShareService {
  ProduceEnttychange = new EventEmitter<string>();

  private baseUrl = 'http://localhost:3000/';
  constructor(    
    private http: HttpClient
  ) { }

  emitChange(e: string) {
    this.ProduceEnttychange.emit(e);
}


ComeOn(){
  return this.http.get(`${this.baseUrl}health`);
}
}
