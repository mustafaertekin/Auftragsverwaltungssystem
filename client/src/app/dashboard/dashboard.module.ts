import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { SimpleNotificationsModule } from 'angular2-notifications';

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
import { DashboardAddressesExtraComponent } from './components/addresses/address-extra/address-extra.component';
import { DashboardDevicesComponent } from './components/devices/devices.component';
import { DashboardNewDeviceComponent } from './components/devices/device-details/new-devices.component';
import { DashboardDeviceModelComponent } from './components/devices/model-details/device-model.component';
import { DashboardDeviceServiceComponent } from './components/devices/service-details/device-service.component';
import { DashboardAddedDeviceComponent } from './components/devices/device-details/added-devices/added-devices.component';
import { DashboardModelExtraComponent } from './components/devices/model-details/added-model/added-model.component';
import { DashboardDeviceServiceExtraComponent } from './components/devices/service-details/added-service/added-service.component';
import { UsersComponent } from './components/users/users.component';
import { DashboardCustomersComponent } from './components/customers/customers/customers.component';
import { DashboardSettingsComponent } from './components/settings/settings.component';
import { DashboardOrderServicesComponent } from './components/orders/order-services/order-services.component';
import { SharedModule } from '@avs-ecosystem/modules/shared/shared.module';
import { DashboardCustomerItemComponent } from './components/customers/customer-item/customer-item.component';
import { DashboardCustomerOrdersComponent } from './components/customers/customer-orders/customer-orders.component';
import { DashboardNewCustomerComponent } from './components/customers/new-customer/new-customer.component';
import { DashboardUserItemComponent } from './components/users/user-item/user-item.component';
import { DashboardUserDetailsComponent } from './components/users/user-details/user-details.component';
import { DashboardNewUserComponent } from './components/users/new-user/new-user.component';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { DashboardOrderItemServiceComponent } from './components/orders/order-details/order-item-service/order-item-service.component';
import { DashboardSideNavComponent } from '@avs-ecosystem/modules/shared/avs-sidenav/avs-sidenav.component';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(DashboardRoutes, { onSameUrlNavigation: 'reload' }),
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    PerfectScrollbarModule,
    SimpleNotificationsModule.forRoot(),
    SharedModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    })
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
    DashboardAddressesExtraComponent,
    DashboardDevicesComponent,
    DashboardNewDeviceComponent,
    DashboardDeviceModelComponent,
    DashboardDeviceServiceComponent,
    DashboardAddedDeviceComponent,
    DashboardModelExtraComponent,
    DashboardDeviceServiceExtraComponent,
    UsersComponent,
    DashboardCustomersComponent,
    DashboardSettingsComponent,
    DashboardOrderServicesComponent,
    DashboardCustomerItemComponent,
    DashboardCustomerOrdersComponent,
    DashboardNewCustomerComponent,
    DashboardUserItemComponent,
    DashboardUserDetailsComponent,
    DashboardNewUserComponent,
    DashboardOrderItemServiceComponent,
    DashboardSideNavComponent
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ]
})
export class DashboardPageModule {
}
