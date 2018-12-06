import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';
import { HttpModule } from '@angular/http';
import {TranslateModule, TranslateLoader, TranslateService} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {FlexLayoutModule} from "@angular/flex-layout";

import 'hammerjs';
import { AppComponent } from './components/app-component/app.component';
import { MaterialModule } from './modules/material/material.module';
import { AppRoutingModule } from './modules/routes/app-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { LoginPageComponent } from './pages/login/login.component';

import { AuthService } from './services/auth.service';
import { TokenService } from './services/token.service';
import { AppHttpService} from './services/app-http.service';
import { IsAuthorizedGuard } from './services/is-authorized.guard';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SnackMessageComponent } from './components/snack-message/snack-message.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { ReportComponent } from './components/report/report.component';
import { OrdersComponent } from './components/orders/orders.component';
import { CustomersComponent } from './components/customers/customers.component';
import { BrandsComponent } from './components/brands/brands.component';
import { ServicesComponent } from './components/services/services.component';
import { UsersComponent } from './components/users/users.component';
import { HomeComponent } from './pages/home/home.component';
import { HomeHeaderComponent } from './components/home-header/home-header.component';
import { HomeFooterComponent } from './components/home-footer/home-footer.component';
import { HomeContentComponent } from './components/home-content/home-content.component';
import { OrdersFormComponent } from './components/orders-form/orders-form.component';
import { CustomersFormComponent } from './components/customers-form/customers-form.component';
import { BrandsFormComponent } from './components/brands-form/brands-form.component';


export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    LoginPageComponent,
    DashboardComponent,
    SnackMessageComponent,
    SidenavComponent,
    ReportComponent,
    OrdersComponent,
    CustomersComponent,
    BrandsComponent,
    ServicesComponent,
    UsersComponent,
    HomeComponent,
    HomeHeaderComponent,
    HomeFooterComponent,
    HomeContentComponent,
    OrdersFormComponent,
    CustomersFormComponent,
    BrandsFormComponent
   
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpModule,
    FlexLayoutModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
  })
  ],
  providers: [Http, AuthService, AppHttpService, TokenService, IsAuthorizedGuard],
  bootstrap: [AppComponent],
  entryComponents: [SnackMessageComponent]
})
export class AppModule { 
  constructor(translate: TranslateService) {
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en-EN');
   /*  let culture = window.navigator.language
    culture = `${culture}-${culture.toUpperCase()}`; */

     // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('en-EN');
}
}
