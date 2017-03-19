import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from 'ng2-translate';
import { SharedComponents } from './components/index';
import { TodosService } from './services/todos.service';
import { NavbarService } from './components/navbar/navbar.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    FormsModule
  ],
  declarations: [
    SharedComponents
  ],
  providers: [
    TodosService,
    NavbarService
  ],
  exports: [
    // Modules
    CommonModule,
    TranslateModule,
    RouterModule,
    FormsModule,
    // Components
    SharedComponents
  ]
})
export class SharedModule {
}
