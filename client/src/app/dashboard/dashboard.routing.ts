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
import { DashboardNewCustomerComponent } from './components/customers/new-customer/new-customer.component';
import { DashboardNewUserComponent } from './components/users/new-user/new-user.component';
export const DashboardRoutes: Routes = [
  {
    path: 'dashboard',
    component: DashboardMainLayoutComponent,
    canActivate: [IsAuthorizedGuard] ,
    children: [
      { path: '', redirectTo: 'main', pathMatch: 'full'},
      { path: 'main', component: DashboardMainComponent },
      { path: 'orders/:id', component: DashboardOrdersComponent },
      { path: 'new-order', component: DashboardNewOrderComponent },
      { path: 'devices', component: DashboardDevicesComponent },
      { path: 'users/:id', component: UsersComponent },
      { path: 'new-user', component: DashboardNewUserComponent },
      { path: 'customers/:id', component: DashboardCustomersComponent },
      { path: 'new-customer', component: DashboardNewCustomerComponent },
      { path: 'settings', component: DashboardSettingsComponent }

    ]
  }
];
