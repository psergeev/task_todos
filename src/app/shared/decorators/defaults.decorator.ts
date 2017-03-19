export function Defaults<T>(defaults: T): ClassDecorator {
  return function (target: Function) {
    target.prototype._defaults = defaults;
  };
}
