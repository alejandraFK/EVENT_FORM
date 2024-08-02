import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgSelectModule } from '@ng-select/ng-select';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { EventService } from '../../shared/services/event.service';
import { Ievent } from '../../shared/interfaces/ievent';
import { Ifilter } from '../../shared/interfaces/ifilter';
import { AlertService } from '../../shared/services/alert.service';
import Swal from 'sweetalert2';
import { EventTypes } from '../../shared/constants/event-types';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-consult-event',
  standalone: true,
  imports: [CommonModule, FormsModule, NgSelectModule],
  templateUrl: './consult-event.component.html',
  styleUrl: './consult-event.component.scss'
})
export class ConsultEventComponent implements OnInit {
  filters: Ifilter = {
    type: undefined,
    initDate: undefined,
    endDate: undefined
  };
  eventsInfo: Ievent[] = [];
  eventType: string[] = Object.values(EventTypes);
  headers = [
    'ID', 'Tipo', 'Fecha', 'Descripción'
  ];

  constructor(private service: EventService, private alert: AlertService) { }

  ngOnInit(): void {
    this.getEvents();
  }

  getEvents() {
    Swal.showLoading();
    this.service.getInfo().subscribe((res) => {
      if (res.body.length <= 0) {
        this.alert.info('Sin información', 'Búsqueda sin resultados.');
      } else {
        this.eventsInfo = res.body.map((item: Ievent) => ({ ...item, type: item.type.includes('type') ? 'Evento API' : item.type }));
        Swal.close();
      }
    }, (error) => {
      this.alert.error('', `${error.status} - ${error.statusText}`);
    })
  }

  resetFilter() {
    this.filters = {
      type: undefined,
      initDate: undefined,
      endDate: undefined
    };
  }

  buildFilter(): { initDate: string | Date; endDate: string | Date; type: string; } {
    const filters = {
      initDate: this.filters.initDate != undefined ? this.filters.initDate : new Date(),
      endDate: this.filters.endDate != undefined ? this.filters.endDate : new Date(),
      type: this.filters.type != undefined ? this.filters.type : 'API'
    }
    return filters;
  }

  filterInformation() {
    const filterValues = this.buildFilter();
    this.eventsInfo = this.eventsInfo.filter(item => {
      item.date >= filterValues.initDate &&
        item.date <= filterValues.endDate &&
        item.type == filterValues.type
    });
    this.eventsInfo.length <= 0 ?
      this.alert.info('Sin información', 'Búsqueda sin resultados.') :
      Swal.close();
  }

  get validFilters(): boolean {
    const filterValues = Object.values(this.filters);
    return filterValues.some(item => item == undefined);
  }
}
