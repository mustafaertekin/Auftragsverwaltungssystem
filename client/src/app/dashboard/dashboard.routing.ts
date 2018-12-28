import { Routes } from '@angular/router';
import { IsAuthorizedGuard } from '@avs-ecosystem/services/is-authorized.guard';
import { DashboardMainLayoutComponent } from './components/layout/layout.component';
import { DashboardMainComponent } from './components/main/main.component';
import { DashboardOrdersComponent } from './components/orders/orders.component';
import { DashboardNewOrderComponent } from './components/orders/new-order/new-order.component';
import { DashboardDevicesComponent } from './components/devices/devices.component';
import { UsersComponent } from './components/users/users.component';
import { DashboardCustomersComponent } from './components/customers/customers/customers.component';
import { DashboardSettingsComponent } from './components/settings/settings.component';
export const DashboardRoutes: Routes = [
  {
    path: 'dashboard',
    component: DashboardMainLayoutComponent,
    canActivate: [IsAuthorizedGuard] ,
    children: [
      { path: '', redirectTo: 'main', pathMatch: 'full'},
      { path: 'main', component: DashboardMainComponent },
      // { path: 'orders', component: DashboardOrdersComponent },
      { path: 'orders/:id', component: DashboardOrdersComponent },
      { path: 'new-order', component: DashboardNewOrderComponent },
      { path: 'devices', component: DashboardDevicesComponent },
      { path: 'users/:id', component: UsersComponent },
      { path: 'customers/:id', component: DashboardCustomersComponent },
      { path: 'settings', component: DashboardSettingsComponent }

    ]
  }
];
