import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NotificationService } from '@avs-ecosystem/services/notification-sevice';
import { MaterialModule } from '@avs-ecosystem/modules/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpHandler } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotificationMockService } from '@avs-ecosystem/services/mockServices/notification-mock-sevice';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export const getImports = () => {
  return [
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: (createTranslateLoader),
          deps: [HttpClient]
      }
    })
  ];
};

export const getShemas = () => {
  return [ NO_ERRORS_SCHEMA ];
};

export const getProviders = () => {
  return [
    { provide: NotificationService, useValue: NotificationMockService},
    HttpClient,
    HttpHandler
  ];
};

