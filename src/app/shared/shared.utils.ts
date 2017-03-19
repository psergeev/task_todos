import isArray from 'lodash-es/isArray';
import isFunction from 'lodash-es/isFunction';
import isEmpty from 'lodash-es/isEmpty';
import cloneDeep from 'lodash-es/cloneDeep';

export class Utils {
  public static generateId() {
    let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      let r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });

    return uuid;
  }

  public static isEmpty(value?: any) {
    return isEmpty(value);
  }

  public static isFunction(value?: any) {
    return isFunction(value);
  }

  public static isArray<T>(value?: any) {
    return isArray(value);
  }

  public static cloneDeep<T>(value: T) {
    return cloneDeep(value);
  }
}
