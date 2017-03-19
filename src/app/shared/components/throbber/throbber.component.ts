import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'demo-throbber',
  moduleId: module.id,
  template: `<div class="loader" *ngIf="delay"><h2>{{ 'T_LOADING' | translate }}</h2><div class="throbber"></div></div>`,

})
export class ThrobberComponent implements OnInit {
  private _delayTime: number = 600;
  private _delay: boolean = false;

  public get delay(): boolean {
    return this._delay;
  }

  public ngOnInit() {
    setTimeout(() => this._delay = true, this._delayTime);
  }
}
