import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UsersComponent} from "./users.component";
import {RouterModule} from "@angular/router";
import {TranslateModule} from "@ngx-translate/core";
import {NgbDropdownModule} from "@ng-bootstrap/ng-bootstrap";
import {DropdownMenusModule, WidgetsModule} from "../../_metronic/partials";
import {ReactiveFormsModule} from "@angular/forms";
import {NgSelectModule} from "@ng-select/ng-select";
import { UserComponent } from './user/user.component';
import {InlineSVGModule} from "ng-inline-svg-2";
import {UserOverviewComponent} from "./user/user-overview/user-overview.component";
import { UserSettingsComponent } from './user/user-settings/user-settings.component';
import { UserDealsComponent } from './user/user-deals/user-deals.component';



@NgModule({
  declarations: [
    UsersComponent,
    UserComponent,
    UserOverviewComponent,
    UserSettingsComponent,
    UserDealsComponent
  ],
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
        children: [
          {
            path: 'overview',
            component: UserOverviewComponent
          },
          {
            path: 'settings',
            component: UserSettingsComponent
          }
        ]
      }
    ]),
    TranslateModule,
    NgbDropdownModule,
    WidgetsModule,
    ReactiveFormsModule,
    NgSelectModule,
    InlineSVGModule,
    DropdownMenusModule
  ]
})
export class UsersModule { }
