import { Component, OnInit } from '@angular/core';
import { TodosService } from '../../services/todos.service';
import { BaseCollection } from '../../collections/base.collection';
import { TodoModel } from '../../models/todo.model';
import { Utils } from '../../shared.utils';
import { NavbarService } from './navbar.service';

@Component({
  selector: 'demo-navbar',
  moduleId: module.id,
  templateUrl: 'navbar.component.html'
})
export class NavbarComponent implements OnInit {
  private _todos: BaseCollection<TodoModel>;

  public get todos() {
    return this._todos;
  }

  public get isLoaded() {
    return this._todos !== undefined;
  }

  constructor(private _todosService: TodosService,
              private _navbarService: NavbarService) {
  }

  public ngOnInit() {
    this._load();
    this._navbarService.reloadCommand.subscribe(() => this._load());
  }

  public addTodo() {
    let newModel = new TodoModel();
    newModel.id = Utils.generateId();

    this._todos.add(new TodoModel());
    this._todosService.save(newModel).subscribe(() => this._load());
  }

  private _load() {
    this._todosService.list().subscribe((x: BaseCollection<TodoModel>) => this._todos = x);
  }
}
