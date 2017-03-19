import { Component } from '@angular/core';
import { TranslateService } from 'ng2-translate';
import './operators';

@Component({
  selector: 'demo-app',
  moduleId: module.id,
  template: `<router-outlet></router-outlet>`
})
export class AppComponent {
  constructor(translate: TranslateService) {
    translate.use('en');
  }
}
