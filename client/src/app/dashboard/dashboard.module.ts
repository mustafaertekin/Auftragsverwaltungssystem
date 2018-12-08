import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@avs-ecosystem/modules/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DashboardRoutes } from './dashboard.routing';
import { DashboardMainComponent } from './components/main/main.component';
import { DashboardMainContentComponent } from './components/layout/content/content.component';
import { DashboardMainFooterComponent } from './components/layout/footer/footer.component';
import { DashboardMainHeaderComponent } from './components/layout/header/header.component';
import { DashboardMainLayoutComponent } from './components/layout/layout.component';
import { DashboardSideMenuContentComponent } from './components/layout/side-menu-content/menu-content.component';
import { DashboardOrdersComponent } from './components/orders/orders.component';
import { DashboardOrderItemComponent } from './components/orders/order-item/order-item.component';
import { DashboardOrderDetailsComponent } from './components/orders/order-details/order-details.component';
import { DashboardNewOrderComponent } from './components/orders/new-order/new-order.component';
import { DashboardCustomerDetailsComponent } from './components/customers/customer-details/customer-details.component';
import { DashboardAddressesComponent } from './components/addresses/addresses.component';
import { DashboardAddressesExstraComponent } from './components/addresses/address-exstra/address-exstra.component';
import { DashboardDevicesComponent } from './components/devices/devices.component';
import { DashboardNewDeviceComponent } from './components/devices/device-details/new-devices.component';
import { DashboardDeviceModelComponent } from './components/devices/model-details/device-model.component';
import { DashboardDeviceServiceComponent } from './components/devices/service-details/device-service.component';
import { DashboardAddedDeviceComponent } from './components/devices/device-details/added-devices/added-devices.component';
import { DashboardModelExstraComponent } from './components/devices/model-details/added-model/added-model.component';
import { DashboardDeviceServiceExstraComponent } from './components/devices/service-details/added-service/added-service.component';
import { UsersComponent } from './components/users/users.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(DashboardRoutes),
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    DashboardMainComponent,
    DashboardMainContentComponent,
    DashboardMainFooterComponent,
    DashboardMainHeaderComponent,
    DashboardMainLayoutComponent,
    DashboardSideMenuContentComponent,
    DashboardOrdersComponent,
    DashboardOrderItemComponent,
    DashboardOrderDetailsComponent,
    DashboardNewOrderComponent,
    DashboardCustomerDetailsComponent,
    DashboardAddressesComponent,
    DashboardAddressesExstraComponent,
    DashboardDevicesComponent,
    DashboardNewDeviceComponent,
    DashboardDeviceModelComponent,
    DashboardDeviceServiceComponent,
    DashboardAddedDeviceComponent,
    DashboardModelExstraComponent,
    DashboardDeviceServiceExstraComponent,
    UsersComponent
  ]
})
export class DashboardPageModule {}
