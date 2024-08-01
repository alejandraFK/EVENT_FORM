import { Component, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { ResponseTypes } from '../../shared/constants/response-types';
import { ResponseTypeService } from '../../shared/services/response-type.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-response-selector',
  standalone: true,
  imports: [FormsModule, NgSelectModule],
  templateUrl: './response-selector.component.html',
  styleUrl: './response-selector.component.scss'
})
export class ResponseSelectorComponent implements OnDestroy {
  ResponseTypeSubscription: Subscription;

  response: string | undefined;
  responseType: string[] = Object.values(ResponseTypes);

  constructor(private service: ResponseTypeService) {
    this.ResponseTypeSubscription = this.service.responseType.subscribe((response) => {
      this.response = response;
    });
  }

  updateResponseType(value:any) {
    console.log(value);
    this.service.setValue(value);
  }
  ngOnDestroy(): void {
    this.ResponseTypeSubscription.unsubscribe();
  }
}
