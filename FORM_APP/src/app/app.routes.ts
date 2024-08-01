import { Routes } from '@angular/router';
import { CreateEventComponent } from './components/create-event/create-event.component';
import { ConsultEventComponent } from './components/consult-event/consult-event.component';
import { AppComponent } from './app.component';
import { LayoutComponent } from './components/layout/layout.component';

export const routes: Routes = [
    {
        path: '',
        component: AppComponent,
        children: [
            {
                path: '',
                component: LayoutComponent,
                children: [
                    {
                        path: 'create',
                        component: CreateEventComponent
                    }, {
                        path: 'consult',
                        component: ConsultEventComponent
                    }
                ]
            }
        ]
    }
];
