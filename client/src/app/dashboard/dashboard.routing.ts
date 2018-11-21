import { Routes } from '@angular/router'; 
import { DashboardMainComponent } from './components/main/main.component';
export const DashboardRoutes: Routes = [
  {
    path: 'dashboard',
    children: [
      {
        path: 'main',
        component: DashboardMainComponent
      }
    ]
  }
];
