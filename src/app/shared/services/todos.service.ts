import { RestService } from '../decorators/rest-service.decorator';
import { ITodo, TodoModel } from '../models/todo.model';
import { Injectable } from '@angular/core';
import { FirebaseRestService } from './firebase-rest.service';

@Injectable()
@RestService({
  endpoint: 'https://todos-c70e3.firebaseio.com',
  entity: 'todos',
  entityConstructor: TodoModel
})
export class TodosService extends FirebaseRestService<ITodo, TodoModel> {
}
