import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { EventService } from './shared/services/event.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule, NgSelectModule, MatDatepickerModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'FORM_APP';
  filtros = {
    tipo: undefined,
    fechaInicio: undefined,
    fechaFin: undefined
  }
  eventsInfo: any;
  TipoEventos = [
    'API',
    'Manual'
  ]
  headers = [
    'ID', 'Tipo', 'Fecha'
  ]

  constructor(private service: EventService) {
    this.getEvents();
  }

  getEvents() {
    this.service.getInfo().subscribe((res) => {
      this.eventsInfo = res;
      console.log(res);
    })
  }
}
