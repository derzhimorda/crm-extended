import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RolesComponent} from "./roles.component";
import {TranslateModule} from "@ngx-translate/core";
import {NgbDropdownModule} from "@ng-bootstrap/ng-bootstrap";
import {RouterModule} from "@angular/router";
import {WidgetsModule} from "../../_metronic/partials";



@NgModule({
  declarations: [RolesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: RolesComponent,
      },
    ]),
    TranslateModule,
    NgbDropdownModule,
    WidgetsModule
  ]
})
export class RolesModule { }
