import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DealsComponent} from "./deals.component";
import {RouterModule} from "@angular/router";
import {TranslateModule} from "@ngx-translate/core";
import {NgbDropdownModule} from "@ng-bootstrap/ng-bootstrap";
import {WidgetsModule} from "../../_metronic/partials";
import {ReactiveFormsModule} from "@angular/forms";
import {NgSelectModule} from "@ng-select/ng-select";
import {DealComponent} from "./deal/deal.component";
import {
  OWL_DATE_TIME_FORMATS,
  OwlDateTimeModule,
  OwlNativeDateTimeModule
} from "@danielmoncada/angular-datetime-picker";

export const MY_NATIVE_FORMATS = {
  fullPickerInput: {year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric'},
  datePickerInput: {year: 'numeric', month: 'numeric', day: 'numeric'},
  timePickerInput: {hour: 'numeric', minute: 'numeric'},
  monthYearLabel: {year: 'numeric', month: 'short'},
  dateA11yLabel: {year: 'numeric', month: 'long', day: 'numeric'},
  monthYearA11yLabel: {year: 'numeric', month: 'long'},
};

@NgModule({
  declarations: [DealsComponent, DealComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: DealsComponent,
      },
      {
        path: ':id',
        component: DealComponent,
      }
    ]),
    WidgetsModule,
    TranslateModule,
    NgbDropdownModule,
    ReactiveFormsModule,
    NgSelectModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule
  ],
  providers: [
    {provide: OWL_DATE_TIME_FORMATS, useValue: MY_NATIVE_FORMATS},
  ],
})
export class DealsModule { }
