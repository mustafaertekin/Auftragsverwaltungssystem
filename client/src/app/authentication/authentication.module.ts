import { NgModule } from '@angular/core'; 
import { CommonModule } from '@angular/common'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@avs-ecosystem/modules/material/material.module';
import { AuthenticationRoutesModule } from './authentication.routing';
import { ForgotComponent } from './forgot/forgot.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  imports: [
    CommonModule,
    AuthenticationRoutesModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  declarations: [
    ForgotComponent,
    LoginComponent,
  ]
})
export class AuthenticationModule {}
