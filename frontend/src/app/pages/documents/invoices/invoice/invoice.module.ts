import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {InvoiceComponent} from "./invoice.component";
import {RouterModule} from "@angular/router";
import {WidgetsModule} from "../../../../_metronic/partials";
import {TranslateModule} from "@ngx-translate/core";
import {NgbDropdownModule} from "@ng-bootstrap/ng-bootstrap";



@NgModule({
  declarations: [InvoiceComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: InvoiceComponent
      }
    ]),
    WidgetsModule,
    TranslateModule,
    NgbDropdownModule,
  ]
})
export class InvoiceModule { }
