import { NgModule } from '@angular/core';
import { SearchComponent } from './search/search.component';
import { GeneralErrorComponent } from './general-error-message/general-error.component';
import { FadeInComponent } from './animations/fadein/fadein.component';
import { MaterialModule } from '@avs-ecosystem/modules/material/material.module';


@NgModule({
  imports: [
    MaterialModule
  ],
  declarations: [
    SearchComponent,
    GeneralErrorComponent,
    FadeInComponent
  ],
  exports: [
    SearchComponent,
    GeneralErrorComponent,
    FadeInComponent
  ],
  entryComponents: [GeneralErrorComponent],
})
export class SharedModule {}
