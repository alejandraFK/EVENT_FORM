import { Component } from '@angular/core';
import { ConsultEventComponent } from '../consult-event/consult-event.component';
import { CreateEventComponent } from '../create-event/create-event.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';
import { DocumentationComponent } from '../documentation/documentation.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [ConsultEventComponent, CreateEventComponent, SidebarComponent, DocumentationComponent, RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

}
