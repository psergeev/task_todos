import { Route } from '@angular/router';
import { TodoItemComponent } from './todo-item/todo-item.component';

export const ClientRoutes: Route[] = [{
  path: 'todo-item/:id',
  component: TodoItemComponent,
}];
