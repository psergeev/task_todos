import { Component, OnInit, Input, Output, EventEmitter, TemplateRef } from '@angular/core';

export enum InlineEditControlType {
  TEXT,
  DATE,
  NUMBER,
  SELECT
}

const InlineEditControlTypeHashMap: { [id: number]: string } = {
  [InlineEditControlType.TEXT]: 'text',
  [InlineEditControlType.DATE]: 'date',
  [InlineEditControlType.NUMBER]: 'number'
};

type InlineEditData = number | string;


@Component({
  selector: 'demo-inline-edit',
  moduleId: module.id,
  templateUrl: 'inline-edit.component.html'
})
export class InlineEditComponent implements OnInit {
  private _data: InlineEditData;
  private _dataSource: InlineEditData;
  private _dataChange: EventEmitter<InlineEditData> = new EventEmitter<InlineEditData>();
  private _onSave: EventEmitter<Function> = new EventEmitter<Function>();
  private _controlType: InlineEditControlType;
  private _editMode: boolean = false;
  private _isSaving: boolean = false;
  private _selectItems: any[];
  private _selectItemTemplate: TemplateRef<any>;
  private _numberMinValue: number = null;
  private _numberMaxValue: number = null;
  private _maxLength: number = null;

  @Input()
  public set data(value: InlineEditData) {
    this._data = value;
  }

  @Output()
  public get dataChange() {
    return this._dataChange;
  }

  @Input()
  public set controlType(type: InlineEditControlType) {
    this._controlType = type;
  }

  @Output()
  public get onSave() {
    return this._onSave;
  }

  @Input()
  public set selectItems(items: any[]) {
    this._selectItems = items;
  }

  @Input()
  public set selectItemTemplate(template: TemplateRef<any>) {
    this._selectItemTemplate = template;
  }

  @Input()
  public set numberMaxValue(value: number) {
    this._numberMaxValue = value;
  }

  public get numberMaxValue(): number {
    return this._numberMaxValue;
  }

  @Input()
  public set numberMinValue(value: number) {
    this._numberMinValue = value;
  }

  public get numberMinValue(): number {
    return this._numberMinValue;
  }

  @Input()
  public set maxLength(value: number) {
    this._maxLength = value;
  }

  public get maxLength(): number {
    return this._maxLength;
  }

  public get selectItemTemplate(): TemplateRef<any> {
    return this._selectItemTemplate;
  }

  public get selectItems(): any[] {
    return this._selectItems;
  }

  public get InlineEditControlType() {
    return InlineEditControlType;
  }

  public get controlType(): InlineEditControlType {
    return this._controlType;
  }

  public get data(): InlineEditData {
    return this._data;
  }

  public get editMode(): boolean {
    return this._editMode;
  }

  public get isSaving(): boolean {
    return this._isSaving;
  }

  public ngOnInit() {
    this._dataSource = this._data;
  }

  public getInputType(dataType: InlineEditControlType): string {
    return InlineEditControlTypeHashMap[dataType];
  }

  public startEdit(event: Event) {
    event.stopPropagation();
    event.preventDefault();
    this._editMode = true;
  }

  public cancelEdit(event?: Event) {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }
    this._editMode = false;
    this._data = this._dataSource;
  }

  public saveComplete() {
    this._isSaving = false;
    this.cancelEdit();
  }

  public save(event: Event) {
    event.stopPropagation();
    event.preventDefault();
    if (!this._isSaving) {
      this._isSaving = true;
      this._dataSource = this._data;
      this._dataChange.emit(this._data);
      this._onSave.emit(this.saveComplete.bind(this));
    }
  }
}
