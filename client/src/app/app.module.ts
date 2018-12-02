import { NgModule } from '@angular/core';
import { MainPageRoutesModule } from './app-routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { FlexLayoutModule} from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import 'hammerjs';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { Http, AuthService,
  AppHttpService,
  TokenService,
  IsAuthorizedGuard
} from '@avs-ecosystem/services';

import { HomePageModule } from './home/home.module';
import { DashboardPageModule } from './dashboard/dashboard.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { from } from 'rxjs';
import { ClientService } from '@avs-ecosystem/services/client.service';
import { AddressService } from '@avs-ecosystem/services/address.service';
import { AuthInterceptor } from '@avs-ecosystem/services/auth.interceptor';
import { DeviceService } from '@avs-ecosystem/services/device.service';
import { DeviceServiceType } from '@avs-ecosystem/services/device-service-type.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    HomePageModule,
    DashboardPageModule,
    AuthenticationModule,
    BrowserModule,
    MainPageRoutesModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpModule,
    FlexLayoutModule,
    BrowserAnimationsModule,

  ],
  bootstrap: [AppComponent],
  providers: [
    Http,
    AuthService,
    AppHttpService,
    TokenService,
    IsAuthorizedGuard,
    ClientService,
    AddressService,
    DeviceService,
    DeviceServiceType,
    {
      provide : HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi   : true,
    },
  ],
})
export class AppModule {}
