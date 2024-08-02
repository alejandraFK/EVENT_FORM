import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Ievent } from '../interfaces/ievent';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient) { }

  getInfo(): Observable<any> {
    return this.http.get(environment.MOCKS, { observe: 'response' });
  }
  postEvent(request: Ievent): Observable<any> {
    return this.http.post(environment.MOCKS, request, { observe: 'response' });
  }
}
