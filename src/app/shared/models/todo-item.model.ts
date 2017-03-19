import { BaseModel } from './base.model';
import { Defaults } from '../decorators/defaults.decorator';

export class ItemStatus {
  public static ACTIVE = 'A';
  public static COMPLETED = 'C';
}

export interface ITodoItem {
  name: string;
  status: string;
}

@Defaults<ITodoItem>({
  name: 'Unnamed',
  status: 'A'
})
export class TodoItemModel extends BaseModel<ITodoItem> implements ITodoItem {
  public name: string;
  status: string;
}
