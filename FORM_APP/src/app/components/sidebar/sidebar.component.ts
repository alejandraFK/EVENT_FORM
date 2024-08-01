import { Component } from '@angular/core';
import { Imenu } from '../../shared/interfaces/imenu';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  menu: Imenu[] = [
    {
      title: 'Registrar',
      route: 'create',
      icon: 'bi-plus-square'
    },
    {
      title: 'Consultar',
      route: 'consult',
      icon: 'bi-search'
    }
  ];
}
