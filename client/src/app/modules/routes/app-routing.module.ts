import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from '../../pages/login/login.component';
import { HeaderComponent } from '../../components/header/header.component';
import { IsAuthorizedGuard } from '../../services/is-authorized.guard';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent },
  { path: '', component: DashboardComponent, canActivate: [IsAuthorizedGuard]  },
  { path: 'dashboard', component: DashboardComponent, canActivate: [IsAuthorizedGuard]  }
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
