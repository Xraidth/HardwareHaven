import { Injectable } from '@angular/core';
import Toastify from 'toastify-js';

@Injectable({
  providedIn: 'root'
})
export class ToastService {


  showToast(message: string, duration: number = 3000) {
    Toastify({
      text: message,
      duration: duration,
      gravity: 'bottom',
      position: 'center',
      backgroundColor: 'rgba(255, 0, 0, 0.8)',
      stopOnFocus: true
    }).showToast();
  }

}

