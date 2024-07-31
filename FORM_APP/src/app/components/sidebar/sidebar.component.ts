import { Component } from '@angular/core';
import { Imenu } from '../../shared/interfaces/imenu';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  menu: Imenu[] = [];
}
