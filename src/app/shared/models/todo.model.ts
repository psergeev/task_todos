import { ModelId, BaseModel } from './base.model';
import { Defaults } from '../decorators/defaults.decorator';
import { ITodoItem, ItemStatus } from './todo-item.model';

export interface ITodo {
  id?: ModelId;
  name: string;
  items: ITodoItem[];
}

@Defaults<ITodo>({
  name: 'Unnamed',
  items: []
})
export class TodoModel extends BaseModel<ITodo> implements ITodo {
  public id: ModelId;
  public name: string;
  public items: ITodoItem[];

  public get uncompletedItems(): number {
    if (this.items && this.items.length) {
      return this.items.filter((item: ITodoItem) => item.status === ItemStatus.ACTIVE).length;
    }

    return 0;
  }
}
