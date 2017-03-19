import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { APP_BASE_HREF, CommonModule } from '@angular/common';
import { HttpModule, Http } from '@angular/http';
import { RouterModule } from '@angular/router';
import { TranslateModule } from 'ng2-translate';
import { TranslateStaticLoader, TranslateLoader } from 'ng2-translate';
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { ClientModule } from './client/client.module';

export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, '/assets/i18n', '.json');
}

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    CommonModule,
    RouterModule.forRoot(routes),
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: createTranslateLoader,
      deps: [Http]
    }),
    SharedModule,
    ClientModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [{
    provide: APP_BASE_HREF,
    useValue: '<%= APP_BASE %>'
  }],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
