import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotComponent } from './forgot/forgot.component';
import { LoginComponent } from './login/login.component';
export const routes: Routes = [
  {
    path: 'auth',
    children: [
      {
        path: 'forgot',
        component: ForgotComponent
      },
      {
        path: 'login',
        component: LoginComponent
      }
    ]
  }
];

@NgModule({
    imports: [
      RouterModule.forRoot(routes)
    ],
    exports: [
      RouterModule
    ]
  })
  export class AuthenticationRoutesModule { }
