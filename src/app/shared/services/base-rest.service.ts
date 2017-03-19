import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BaseModel, ModelId, IBaseEntity } from '../models/base.model';
import { BaseCollection } from '../collections/base.collection';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { Utils } from '../shared.utils';

export interface Type<T> {
  new(...args: any[]): T;
}

export interface IResponse<T> {
  data: T;
}
@Injectable()
export class BaseRestService<T extends IBaseEntity, M extends BaseModel<T>> {
  protected _endpointTemplate: string;
  protected _entity: string;
  protected _entityConstructor: Type<M>;
  protected _endpoint: string;

  constructor(protected _http: Http) {
  }

  public createModel(json?: T): M {
    return new this._entityConstructor(json);
  }

  public get(id?: ModelId): Observable<M> {
    return <Observable<M>>this._http
      .get(this._getRequestUrl(id))
      .map((response: Response) => response.json())
      .map((json: T) => this.createModel(json))
      .catch(() => this._handleError());
  }

  public list(): Observable<BaseCollection<M>> {
    return this._http
      .get(this._getRequestUrl(null))
      .map((response: Response) => response.json())
      .map((response: IResponse<T[]>) => {
        let data: T[] = <T[]>response.data.filter((entity: T) => entity !== null);
        let entities = data.map((entity: T) => this.createModel(entity));
        return new BaseCollection<M>(entities);
      })
      .catch(() => this._handleError());
  }

  public save(model: M): Observable<M> {
    if (!model.id) {
      return this._create(model);
    } else {
      return this._update(model);
    }
  }

  protected _create(model: M): Observable<M> {
    let body = JSON.stringify(model.toJSON());
    let options = this._getRequestOptions();
    let url = this._getRequestUrl();

    return <Observable<M>>this._http
      .post(url, body, options)
      .map((response: Response) => response.json())
      .map((json: T) => this.createModel(json))
      .catch(() => this._handleError());
  }

  protected _update(model: M): Observable<M> {
    let body = JSON.stringify(model.toJSON());
    let options = this._getRequestOptions();
    let url = this._getRequestUrl(model.id);

    return <Observable<M>>this._http
      .put(url, body, options)
      .map((response: Response) => response.json())
      .map((json: T) => this.createModel(json))
      .catch(() => this._handleError());
  }

  protected _getRequestUrl(id?: ModelId) {
    let url: string[] = [];
    let endpoint = this._endpoint;

    url.push(endpoint);
    url.push(this._urlEntityName(id && id.toString()));

    url = url.filter((part: string) => !Utils.isEmpty(part));

    return url.join('/');
  }

  protected _urlEntityName(id?: string): string {
    return this._entity + (id ? '/' + id : '');
  }

  protected _getRequestOptions() {
    return new RequestOptions({
      headers: this._getHeaders()
    });
  }

  protected _getHeaders() {
    return new Headers({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
  }

  protected _handleError(): ErrorObservable<string|any[]> {
    return Observable.throw('something wrong with api');
  }
}
