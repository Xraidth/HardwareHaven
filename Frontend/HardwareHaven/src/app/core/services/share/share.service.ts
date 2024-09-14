import { EventEmitter, Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ShareService {
  ProduceEnttychange = new EventEmitter<string>();

  emitChange(e: string) {
    this.ProduceEnttychange.emit(e);
}
}
