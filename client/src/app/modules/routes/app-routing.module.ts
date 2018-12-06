import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from '../../pages/login/login.component';
import { HeaderComponent } from '../../components/header/header.component';
import { IsAuthorizedGuard } from '../../services/is-authorized.guard';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { OrdersComponent } from '../../components/orders/orders.component';
import { CustomersComponent } from '../../components/customers/customers.component';
import { BrandsComponent } from '../../components/brands/brands.component';
import { ServicesComponent } from '../../components/services/services.component';
import { UsersComponent } from '../../components/users/users.component';
import { HomeComponent } from 'src/app/pages/home/home.component';
import { OrdersFormComponent} from '../../components/orders-form/orders-form.component'; 

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent },
  { path: 'home', component: HomeComponent},
  { path: 'dashboard', component: DashboardComponent,
  children: [
    { path: '', redirectTo: 'orders', pathMatch: 'full' },
    { path: 'orders', component: OrdersComponent },
    { path: 'customers', component: CustomersComponent },
    { path: 'brands', component: BrandsComponent},
    { path: 'services', component: ServicesComponent},
    { path: 'ordersform', component: OrdersFormComponent},
    { path: 'users', component: UsersComponent}], canActivate: [IsAuthorizedGuard]  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
