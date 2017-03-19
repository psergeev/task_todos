import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { TodoItemComponent } from './todo-item/todo-item.component';

@NgModule({
  imports: [SharedModule],
  declarations: [
    TodoItemComponent
  ],
  providers: [],
  exports: []
})
export class ClientModule {
}
