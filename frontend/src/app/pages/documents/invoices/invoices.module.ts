import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {InvoicesComponent} from "./invoices.component";
import {RouterModule} from "@angular/router";
import {WidgetsModule} from "../../../_metronic/partials";
import {TranslateModule} from "@ngx-translate/core";
import {NgbDropdownModule} from "@ng-bootstrap/ng-bootstrap";
import {InvoiceComponent} from "./invoice/invoice.component";



@NgModule({
  declarations: [InvoicesComponent, InvoiceComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: InvoicesComponent
      },
      {
        path: ':id',
        component: InvoiceComponent
      }
    ]),
    WidgetsModule,
    TranslateModule,
    NgbDropdownModule,
  ]
})
export class InvoicesModule { }
