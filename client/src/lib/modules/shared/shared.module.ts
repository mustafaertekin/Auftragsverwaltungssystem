import { NgModule } from '@angular/core';
import { SearchComponent } from './search/search.component';
import { GeneralErrorComponent } from './general-error-message/general-error.component';
import { AvsLineChartComponent } from './graphs/line-chart/line-chart.component';
import { FadeInComponent } from './animations/fadein/fadein.component';
import { MaterialModule } from '@avs-ecosystem/modules/material/material.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  imports: [
    MaterialModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: (createTranslateLoader),
          deps: [HttpClient]
      }
    })
  ],
  declarations: [
    SearchComponent,
    GeneralErrorComponent,
    FadeInComponent,
    AvsLineChartComponent
  ],
  exports: [
    SearchComponent,
    GeneralErrorComponent,
    FadeInComponent,
    AvsLineChartComponent
  ],
  entryComponents: [GeneralErrorComponent],
})
export class SharedModule {}
