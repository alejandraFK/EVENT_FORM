import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient) { }

  getInfo(): Observable<any> {
    return this.http.get(environment.MOCKS);
  }
  searchEvents(tipo: string, fechaInicio: string, fechaFin: string): Observable<any> {
    return this.http.get(`${environment.MOCKS}/events?tipo=${tipo}&fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`);
  }
}
