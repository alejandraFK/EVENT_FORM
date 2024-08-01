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
import { ResponseTypes } from '../../shared/constants/response-types';
import { EventTypes } from '../../shared/constants/event-types';
import { ResponseSelectorComponent } from '../response-selector/response-selector.component';
import { Subscription } from 'rxjs';
import { ResponseTypeService } from '../../shared/services/response-type.service';

@Component({
  selector: 'app-consult-event',
  standalone: true,
  imports: [CommonModule, FormsModule, NgSelectModule, ResponseSelectorComponent],
  templateUrl: './consult-event.component.html',
  styleUrl: './consult-event.component.scss'
})
export class ConsultEventComponent implements OnInit, OnDestroy {
  ResponseTypeSubscription: Subscription;

  filters: Ifilter = {
    type: undefined,
    initDate: undefined,
    endDate: undefined,
    response: undefined
  };
  eventsInfo: Ievent[] = [];
  eventType: string[] = Object.values(EventTypes);
  responseType: string[] = Object.values(ResponseTypes);
  headers = [
    'ID', 'Tipo', 'Fecha', 'Descripción'
  ];

  constructor(private service: EventService, private alert: AlertService, private behaviorResponse: ResponseTypeService) {
    this.ResponseTypeSubscription = this.behaviorResponse.responseType.subscribe((response) => {
      this.filters.response = response;
    });
  }

  ngOnInit(): void {
    this.getEvents();
  }

  getEvents() {
    Swal.showLoading();
    this.service.getInfo().subscribe((res) => {
      if (res.body.length <= 0) {
        this.alert.info('Sin información', 'Búsqueda sin resultados.');
      } else {
        this.eventsInfo = res.body;
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
      endDate: undefined,
      response: undefined
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

  search() {
    const filterValues = this.buildFilter();
    this.service.searchEvents(filterValues.type, filterValues.initDate, filterValues.endDate).subscribe((res) => {
      console.log(res);
      Swal.close();
    })
  }

  get validFilters(): boolean {
    const filterValues = Object.values(this.filters);
    return filterValues.some(item => item == undefined);
  }

  onSubmit() {
    Swal.showLoading(undefined);
    switch (this.filters.response) {
      case ResponseTypes.ok:
        this.resetFilter();
        this.filterInformation();
        break;
      case ResponseTypes.noContent:
        this.search();
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
