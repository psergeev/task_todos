import { RestService, DEFAULT_ENDPOINT, DEFAULT_ADMIN_ENDPOINT } from './rest-service.decorator';
import { TestModel } from '../../tests/tests.utils';

export function main() {
  describe('RestService Decorator', () => {

    let decorate: ClassDecorator;
    let targetClass: Function;

    beforeEach(() => {
      targetClass = new Function();

      decorate = RestService({
        endpoint: '/api/{endpointId}',
        adminEndpoint: '/api/admin/{endpointId}',
        entity: 'test',
        entityConstructor: TestModel
      });

      decorate(targetClass);
    });

    afterEach(() => {
      decorate = undefined;
      targetClass = undefined;
    });

    it('should be defined', () => {
      expect(RestService).toBeDefined();
    });

    it('should be the function', () => {
      expect(RestService instanceof Function).toBeTruthy();
    });

    it('should return the function', () => {
      expect(decorate instanceof Function).toBeTruthy();
    });

    it('should write _entity property to prototype of the target class', () => {
      expect(targetClass.prototype._entity).toBe('test');
    });

    it('should write _entityConstructor property to prototype of the target class', () => {
      expect(targetClass.prototype._entityConstructor).toBe(TestModel);
    });

    it('should write _endpoint property to prototype of the target class', () => {
      expect(targetClass.prototype._endpoint).toBe('/api/{endpointId}');
    });

    it('should write _endpointTemplate property to prototype of the target class', () => {
      expect(targetClass.prototype._endpointTemplate).toBe('/api/{endpointId}');
    });

    it('should write _adminEndpoint property to prototype of the target class', () => {
      expect(targetClass.prototype._adminEndpoint).toBe('/api/admin/{endpointId}');
    });

    it('should write _adminEndpointTemplate property to prototype of the target class', () => {
      expect(targetClass.prototype._adminEndpointTemplate).toBe('/api/admin/{endpointId}');
    });
  });

  describe('RestService Decorator without optional parameters', () => {

    let decorate: ClassDecorator;
    let targetClass: Function;

    beforeEach(() => {
      targetClass = new Function();

      decorate = RestService({
        entity: 'test',
        entityConstructor: TestModel
      });

      decorate(targetClass);
    });

    afterEach(() => {
      decorate = undefined;
      targetClass = undefined;
    });

    it('should write default _endpoint property to prototype of the target class', () => {
      expect(targetClass.prototype._endpoint).toBe(DEFAULT_ENDPOINT);
    });

    it('should write default _adminEndpoint property to prototype of the target class', () => {
      expect(targetClass.prototype._adminEndpoint).toBe(DEFAULT_ADMIN_ENDPOINT);
    });
  });

}
