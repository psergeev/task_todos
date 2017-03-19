import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs/ReplaySubject';

@Injectable()
export class NavbarService {
  private _reloadCommand: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);

  get reloadCommand(): ReplaySubject<boolean> {
    return this._reloadCommand;
  }

  public reloadTodos() {
    this._reloadCommand.next(true);
  }
}
