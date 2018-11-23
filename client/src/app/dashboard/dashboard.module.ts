import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  MatIconModule,
  MatCardModule,
  MatInputModule,
  MatCheckboxModule,
  MatButtonModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DashboardRoutes } from './dashboard.routing';
import { DashboardMainComponent } from './components/main/main.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(DashboardRoutes),
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [ 
    DashboardMainComponent
  ]
})
export class DashboardPageModule {}
