import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SettingsComponent} from "./settings.component";
import {RouterModule} from "@angular/router";
import {WidgetsModule} from "../../_metronic/partials";
import {TranslateModule} from "@ngx-translate/core";
import {NgbDropdownModule} from "@ng-bootstrap/ng-bootstrap";



@NgModule({
  declarations: [SettingsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: SettingsComponent
      }
    ]),
    WidgetsModule,
    TranslateModule,
    NgbDropdownModule,
  ]
})
export class SettingsModule { }
