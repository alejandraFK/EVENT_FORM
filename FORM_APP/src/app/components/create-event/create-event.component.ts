import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { EventTypes } from '../../shared/constants/event-types';
import { ResponseTypes } from '../../shared/constants/response-types';
import { ResponseSelectorComponent } from '../response-selector/response-selector.component';
import { Subscription } from 'rxjs';
import { ResponseTypeService } from '../../shared/services/response-type.service';
import { AlertService } from '../../shared/services/alert.service';
import { EventService } from '../../shared/services/event.service';
import Swal from 'sweetalert2';
import { Ievent } from '../../shared/interfaces/ievent';
import { HttpResponse, HttpResponseBase } from '@angular/common/http';

@Component({
  selector: 'app-create-event',
  standalone: true,
  imports: [CommonModule, FormsModule, NgSelectModule, ResponseSelectorComponent],
  templateUrl: './create-event.component.html',
  styleUrl: './create-event.component.scss'
})
export class CreateEventComponent implements OnDestroy {
  responseType: string[] = Object.values(ResponseTypes);
  ResponseTypeSubscription: Subscription;
  eventForm!: Ievent;
  responseSelected: string | undefined;

  constructor(private service: EventService, private alert: AlertService, private behaviorResponse: ResponseTypeService) {
    this.ResponseTypeSubscription = this.behaviorResponse.responseType.subscribe((response) => {
      this.responseSelected = response;
    });
    this.eventForm = {
      type: EventTypes.MANUAL,
      description: '',
      date: new Date().toLocaleDateString(),
      id: Math.floor(Math.random() * (999 - 1 + 1)) + 1
    };
  }

  get eventFormValid(): boolean {
    return this.eventForm.description.length >= 1 && this.responseSelected != undefined;
  }

  async postEvent() {
    const result = await this.alert.question('Guardar evento', '¿Estás seguro de guardar el nuevo evento?', 'Sí, guardar');
    console.log(result);
    if (result.isConfirmed) {
      this.service.postEvent(this.eventForm).subscribe((res: HttpResponse<HttpResponseBase>) => {
        console.log(res);
        if (res.status >= 200) {
          this.alert.success('Registro exitoso', `${res.status} - ${res.statusText}`);
        } else {
          this.alert.error('Error al registrar', `${res.status} - ${res.statusText}`);
        }
      })
    }
  }

  onSubmit() {
    Swal.showLoading(undefined);
    switch (this.responseSelected) {
      case ResponseTypes.ok:
        this.postEvent();
        break;
      case ResponseTypes.noContent:
        break;
      case ResponseTypes.badRequest:

        break;
      case ResponseTypes.timeout:

        break;
      case ResponseTypes.serverError:

        break;
      default:
        break;
    }
  }

  ngOnDestroy(): void {
    this.ResponseTypeSubscription
  }
}
