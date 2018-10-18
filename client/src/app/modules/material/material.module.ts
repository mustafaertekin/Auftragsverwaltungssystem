import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatButtonModule,
  MatCheckboxModule,
  MatCardModule,
  MatIconModule,
  MatToolbarModule,
  MatFormFieldModule,
  MatInputModule,
  MatChipsModule,
  MatTabsModule,
  MatGridListModule,
  MatMenuModule,
  MatSnackBarModule,
  MatSidenavModule,
  MatListModule,
  MatTableModule,
} from '@angular/material';


@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule,
    MatTabsModule,
    MatGridListModule,
    MatMenuModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatListModule,
    MatTableModule
  ],
  exports: [
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule,
    MatTabsModule,
    MatGridListModule,
    MatMenuModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatListModule,
    MatTableModule
  ],
  declarations: []
})
export class MaterialModule { }
