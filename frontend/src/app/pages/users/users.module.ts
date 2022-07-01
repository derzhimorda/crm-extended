import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UsersComponent} from "./users.component";
import {RouterModule} from "@angular/router";
import {TranslateModule} from "@ngx-translate/core";
import {NgbDropdownModule} from "@ng-bootstrap/ng-bootstrap";
import {WidgetsModule} from "../../_metronic/partials";
import {ReactiveFormsModule} from "@angular/forms";
import {NgSelectModule} from "@ng-select/ng-select";
import { UserComponent } from './user/user.component';



@NgModule({
  declarations: [UsersComponent, UserComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: UsersComponent,
      },
      {
        path: ':id',
        component: UserComponent,
      },
    ]),
    TranslateModule,
    NgbDropdownModule,
    WidgetsModule,
    ReactiveFormsModule,
    NgSelectModule
  ]
})
export class UsersModule { }
