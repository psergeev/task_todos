import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { TodosService } from '../../shared/services/todos.service';
import { ModelId } from '../../shared/models/base.model';
import { TodoModel } from '../../shared/models/todo.model';
import { TodoItemModel, ItemStatus } from '../../shared/models/todo-item.model';
import { InlineEditControlType } from '../../shared/components/inline-edit/inline-edit.component';
import { NavbarService } from '../../shared/components/navbar/navbar.service';

@Component({
  selector: 'demo-todo-item',
  moduleId: module.id,
  templateUrl: 'todo-item.component.html'
})
export class TodoItemComponent  implements OnInit {
  private _id: ModelId;
  private _model: TodoModel;

  get model(): TodoModel {
    return this._model;
  }

  public get isLoaded() {
    return this._model !== undefined;
  }

  public get InlineEditControlType() {
    return InlineEditControlType;
  }

  public get ItemStatus() {
    return ItemStatus;
  }

  constructor(private _route: ActivatedRoute,
              private _todosService: TodosService,
              private _navbarService: NavbarService) {
  }

  public ngOnInit() {
    this._route.params.forEach((params: Params) => {
      this._id = params['id'];
      this._model = undefined;

      this._todosService.get(this._id).subscribe((model: TodoModel) => {
        this._model = model;
      });
    });
  }

  public addItem() {
    let newItem = new TodoItemModel();
    this._model.items.push(newItem);
    this.saveModel();
  }

  public changeItemStatus(item: TodoItemModel) {
    item.status = (item.status === ItemStatus.ACTIVE) ? ItemStatus.COMPLETED : ItemStatus.ACTIVE;
    this.saveModel();
  }

  public saveModel(saveComplete?: Function) {
    this._todosService.save(this._model).subscribe(() => {
      if (saveComplete) {
        saveComplete();
      }

      this._navbarService.reloadTodos();
    });
  }
}
