import { Routes } from '@angular/router';
import { IsAuthorizedGuard } from '@avs-ecosystem/services/is-authorized.guard';
import { DashboardMainLayoutComponent } from './components/layout/layout.component';
import { DashboardMainComponent } from './components/main/main.component';
import { DashboardOrdersComponent } from './components/orders/orders.component';
import { DashboardNewOrderComponent } from './components/orders/new-order/new-order.component';
import { DashboardDevicesComponent } from './components/devices/devices.component';
export const DashboardRoutes: Routes = [
  {
    path: 'dashboard',
    component: DashboardMainLayoutComponent,
    canActivate: [IsAuthorizedGuard] ,
    children: [
      { path: '', redirectTo: 'main', pathMatch: 'full'},
      { path: 'main', component: DashboardMainComponent },
      { path: 'orders', component: DashboardOrdersComponent },
      { path: 'new-order', component: DashboardNewOrderComponent },
      { path: 'devices', component: DashboardDevicesComponent },
    ]
  }
];
