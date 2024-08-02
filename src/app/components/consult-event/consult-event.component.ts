import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { EventService } from '../../shared/services/event.service';
import { Ievent } from '../../shared/interfaces/ievent';
import { Ifilter } from '../../shared/interfaces/ifilter';
import { AlertService } from '../../shared/services/alert.service';
import Swal from 'sweetalert2';
import { EventTypes } from '../../shared/constants/event-types';

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
  baseData: Ievent[] = [];
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
      if (res.body.length <= 0 && res.status == 200) {
        this.alert.info('Sin información', 'Búsqueda sin resultados.');
        this.eventsInfo = [];
      } else if (res.status == 200) {
        Swal.close();
        const result = res.body.map((item: Ievent) => ({ ...item, date: new Date(item.date).toISOString(), type: item.type.includes('type') ? EventTypes.API : EventTypes.MANUAL }));
        this.eventsInfo = result;
        this.baseData = result;
      } else {
        this.alert.error('', `${res.status} - ${res.statusText}`);
        this.eventsInfo = [];
      }
    });
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
      initDate: this.filters.initDate != undefined ? new Date(this.filters.initDate).toISOString() : new Date().toISOString(),
      endDate: this.filters.endDate != undefined ? new Date(this.filters.endDate).toISOString() : new Date().toISOString(),
      type: this.filters.type != undefined ? this.filters.type : 'API'
    }
    return filters;
  }

  filterInformation() {
    const filterValues = this.buildFilter();
    this.eventsInfo = this.baseData.filter((item: Ievent) => {
      const date = new Date(item.date).getTime();
      const initDate = new Date(filterValues.initDate).getTime();
      const endDate = new Date(filterValues.endDate).getTime();
      return (date >= initDate &&
        date <= endDate &&
        item.type == filterValues.type)
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
