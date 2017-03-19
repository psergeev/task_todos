export interface IApiEndpointDecoratorData {
  endpoint?: string;
  entity: string;
  entityConstructor: any;
}

export const DEFAULT_ENDPOINT: string = 'api';

export function RestService(data: IApiEndpointDecoratorData): ClassDecorator {
  if (!data.endpoint) {
    data.endpoint = DEFAULT_ENDPOINT;
  }

  return <ClassDecorator>function (target: Function) {
    target.prototype._entity = data.entity;
    target.prototype._entityConstructor = data.entityConstructor;
    target.prototype._endpoint = data.endpoint;
    target.prototype._endpointTemplate = data.endpoint;

    return target;
  };
}
