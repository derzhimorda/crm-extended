import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientsComponent } from './clients.component'
import { RouterModule } from "@angular/router";
import { WidgetsModule } from "../../_metronic/partials";
import {TranslationModule} from "../../modules/i18n";
import {NgbDropdownModule, NgbTypeaheadModule} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgSelectModule} from "@ng-select/ng-select";
import {ClientsResolver} from "./clients.resolver";
import {UsersResolver} from "../users/users.resolver";
import {Ng2SearchPipeModule} from "ng2-search-filter";


@NgModule({
  declarations: [ClientsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: ClientsComponent,
        resolve: {users: UsersResolver}
      },
    ]),
    WidgetsModule,
    TranslationModule,
    NgbDropdownModule,
    ReactiveFormsModule,
    NgbTypeaheadModule,
    NgSelectModule,
    FormsModule,
    Ng2SearchPipeModule
  ]
})
export class ClientsModule { }
