import { IHashMap } from '../collections/base.collection';
import { Utils } from '../shared.utils';

export type ModelId = string | number;

export interface IBaseEntity {
  id?: ModelId;
}

export interface IBaseModel {
  id: ModelId;
  toJSON(): any;
  [key: string]: any;
}

export class BaseModel<T extends IBaseEntity> implements IBaseModel {
  public id: ModelId;

  protected _defaults: T;

  constructor(attributes?: any) {
    this._assign(attributes);
  }

  public toJSON(): any {
    return Object.keys(this).reduce((memo: IHashMap<any>, key: string) => {
      let value = (<any>this)[key];
      if (!Utils.isFunction(value) && key !== '_defaults') {
        memo[key] = value;
      }
      return memo;
    }, {});
  }

  protected _assign(attributes?: T) {
    let defaults = this._defaults || {};
    Object.assign(this, Utils.cloneDeep(defaults), attributes || {});
  }
}
