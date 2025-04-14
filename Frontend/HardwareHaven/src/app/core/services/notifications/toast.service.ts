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

  showToastSusses(message: string, duration: number = 1000) {
    Toastify({
      text: message,
      duration: duration,
      gravity: 'top',
      position: 'right',
      className: "toast-added",
      style: {
        background: 'rgba(2, 175, 255, 0.8)'
      },
      stopOnFocus: true
    }).showToast();
  }

}

