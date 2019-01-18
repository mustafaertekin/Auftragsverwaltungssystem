import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@avs-ecosystem/modules/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HomePageRoutesModule } from './home.routing';
import { HomeMainComponent } from './components/main/main.component';
import { HomeMainHeaderComponent } from './components/header/header.component';
import { HomeMainContentComponent } from './components/content/content.component';
import { HomeMainLayoutComponent } from './components/layout/layout.component';

@NgModule({
  imports: [
    CommonModule,
    HomePageRoutesModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  declarations: [
    HomeMainComponent,
    HomeMainHeaderComponent,
    HomeMainContentComponent,
    HomeMainLayoutComponent
  ]
})
export class HomePageModule {}
