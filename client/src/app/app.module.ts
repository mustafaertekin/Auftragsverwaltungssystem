import { NgModule } from '@angular/core'; 
import { MainPageRoutesModule } from './app-routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { FlexLayoutModule} from "@angular/flex-layout";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import 'hammerjs';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { Http, AuthService, 
  AppHttpService, 
  TokenService, 
  IsAuthorizedGuard 
} from '@avs-services/index';

import { HomePageModule } from './home/home.module';
import { DashboardPageModule } from './dashboard/dashboard.module';
import { AuthenticationModule } from './authentication/authentication.module';

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
    BrowserAnimationsModule
  ],
  bootstrap: [AppComponent],
  providers: [Http, AuthService, AppHttpService, TokenService, IsAuthorizedGuard],
})
export class AppModule {}