import { IBaseModel } from '../models/base.model';
import { Utils } from '../shared.utils';

export interface IHashMap<T> {
  [key: string]: T;
  [key: number]: T;
}

export class BaseCollection<T extends IBaseModel> {
  protected _idField: string = 'id';
  protected _array: T[] = [];
  protected _hashMap: IHashMap<T> = {};

  public get array(): T[] {
    return this._array;
  }

  constructor(array?: T[]) {
    if (array && array.length > 0) {
      this.add(array);
    }
  }

  public get length() {
    return this._array.length;
  }

  public add(items: T | T[]) {
    let array = Utils.isArray(items) ? items : [items];

    (<T[]>array).forEach((item: T) => {
      this._add(item);
    });
  }

  protected _add(item: T) {
    let id = this._getId(item);

    if (this._hashMap[id]) {
      throw new Error(`This element with id '${id}' already in the collection`);
    }

    this._array.push(item);
    this._hashMap[id] = item;
  }

  protected _getId(item: any): string {
    if (!item[this._idField]) {
      item[this._idField] = Utils.generateId();
    }

    return item[this._idField];
  }
}
