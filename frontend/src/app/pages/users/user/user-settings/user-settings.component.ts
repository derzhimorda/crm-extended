import { Component, OnInit } from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {AuthService, UserType} from "../../../../modules/auth";
import {UntypedFormGroup} from "@angular/forms";

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent implements OnInit {
  user$: Observable<UserType>;
  private unsubscribe: Subscription[] = [];
  userSettingForm = new UntypedFormGroup({

  });

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.user$ = this.auth.currentUserSubject.asObservable();
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

}
