import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResponseTypeService {

  constructor() { }

  private responseBehavior: BehaviorSubject<string | undefined> = new BehaviorSubject<string | undefined>(undefined);
  responseType: Observable<string | undefined> = this.responseBehavior.asObservable();

  setValue(value: string|undefined) {
    this.responseBehavior.next(value);
  }
}
