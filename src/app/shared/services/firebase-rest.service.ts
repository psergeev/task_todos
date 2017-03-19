import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BaseRestService } from './base-rest.service';
import { IBaseEntity, BaseModel } from '../models/base.model';
import { BaseCollection } from '../collections/base.collection';

/**
 * REST Service for Firebase.
 * Is used for data mockups.
 */

@Injectable()
export class FirebaseRestService<T extends IBaseEntity, M extends BaseModel<T>> extends BaseRestService<T, M> {

  public list(): Observable<BaseCollection<M>> {
    return this._http
      .get(this._getRequestUrl(null))
      .map((response: Response) => response.json())
      .map((json: any) => Object.values(json))
      .map((json: T[]) => json.filter((entity: T) => entity !== null))
      .map((json: T[]) => new BaseCollection<M>(json.map((entity: T) => this.createModel(entity))))
      .catch(() => this._handleError());
  }

  protected _urlEntityName(id?: string): string {
    return this._entity + (id ? '/' + id : '') + '.json';
  }
}
