import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientsComponent } from './clients.component'
import { RouterModule } from "@angular/router";
import { WidgetsModule } from "../../_metronic/partials";
import {TranslationModule} from "../../modules/i18n";
import {NgbDropdownModule, NgbTypeaheadModule} from "@ng-bootstrap/ng-bootstrap";
import {ReactiveFormsModule} from "@angular/forms";
import {NgSelectModule} from "@ng-select/ng-select";
import {ClientsResolver} from "./clients.resolver";
import {UsersResolver} from "../users/users.resolver";


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
    NgSelectModule
  ]
})
export class ClientsModule { }
