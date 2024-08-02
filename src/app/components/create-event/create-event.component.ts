import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { EventTypes } from '../../shared/constants/event-types';
import { AlertService } from '../../shared/services/alert.service';
import { EventService } from '../../shared/services/event.service';
import Swal from 'sweetalert2';
import { Ievent } from '../../shared/interfaces/ievent';
import { HttpResponse, HttpResponseBase } from '@angular/common/http';

@Component({
  selector: 'app-create-event',
  standalone: true,
  imports: [CommonModule, FormsModule, NgSelectModule],
  templateUrl: './create-event.component.html',
  styleUrl: './create-event.component.scss'
})
export class CreateEventComponent {
  eventForm!: Ievent;

  constructor(private service: EventService, private alert: AlertService) {
    this.eventForm = {
      type: EventTypes.MANUAL,
      description: '',
      date: new Date().toString(),
      id: Math.floor(Math.random() * (999 - 1 + 1)) + 1
    };
  }

  get eventFormValid(): boolean {
    return this.eventForm.description.length >= 5;
  }

  async postEvent() {
    const result = await this.alert.question('Guardar evento', '¿Estás seguro de guardar el nuevo evento?', 'Sí, guardar');
    if (result.isConfirmed) {
      this.service.postEvent(this.eventForm).subscribe((res: HttpResponse<HttpResponseBase>) => {
        if (res.status >= 200) {
          this.alert.success('Registro exitoso', `${res.status} - ${res.statusText}`);
          this.eventForm = {
            type: EventTypes.MANUAL,
            description: '',
            date: new Date().toString(),
            id: Math.floor(Math.random() * (999 - 1 + 1)) + 1
          }
        } else {
          this.alert.error('Error al registrar', `${res.status} - ${res.statusText}`);
        }
      })
    }
  }
}
