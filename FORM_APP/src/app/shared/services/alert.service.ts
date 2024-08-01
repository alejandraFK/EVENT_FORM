import { Injectable } from '@angular/core';
import Swal, { SweetAlertResult } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  warning(title: string, text: string) {
    Swal.fire({
      icon: 'warning',
      iconColor: '#F4C66D',
      title: title,
      text: text,
      confirmButtonColor: '#374957',
    });
  }
  error(title: string, text: string) {
    Swal.fire({
      icon: 'error',
      iconColor: '#E1747B',
      title: title,
      text: text,
      confirmButtonColor: '#374957',
    });
  }
  success(title: string, text: string) {
    Swal.fire({
      icon: 'success',
      iconColor: '#4EC6A0',
      title: title,
      text: text,
      confirmButtonColor: '#374957',
    });
  }
  question(title: string, text: string, confirmButtonText: string):Promise<SweetAlertResult<any>> {
    return Swal.fire({
      icon: 'question',
      iconColor: '#1E828F',
      title: title,
      text: text,
      showCancelButton: true,
      confirmButtonText: confirmButtonText,
      cancelButtonText: 'Cancelar',
      cancelButtonColor: '#374957',
      confirmButtonColor: '#1E828F',
    })
  }
  info(title: string, text: string) {
    Swal.fire({
      icon: 'info',
      iconColor: '#374957',
      title: title,
      text: text,
      confirmButtonColor: '#374957',
    })
  }
}
