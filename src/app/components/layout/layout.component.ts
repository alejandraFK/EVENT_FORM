import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';
import { Imenu } from '../../shared/interfaces/imenu';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [SidebarComponent, RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
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
    },
    {
      title: '¿Cómo funciona?',
      route: 'documentation',
      icon: 'bi-patch-question'
    }
  ];
}
