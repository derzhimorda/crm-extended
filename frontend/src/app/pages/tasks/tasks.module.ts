import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TasksComponent} from "./tasks.component";
import {WidgetsModule} from "../../_metronic/partials";
import {TranslateModule} from "@ngx-translate/core";
import {RouterModule} from "@angular/router";


@NgModule({
  declarations: [TasksComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: TasksComponent,
      }
    ]),
    WidgetsModule,
    TranslateModule,
  ]
})
export class TasksModule { }
