import { Component, OnInit } from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {AuthService, UserType} from "../../../../modules/auth";

@Component({
  selector: 'app-user-overview',
  templateUrl: './user-overview.component.html',
  styleUrls: ['./user-overview.component.scss']
})
export class UserOverviewComponent implements OnInit {
  user$: Observable<UserType>;
  private unsubscribe: Subscription[] = [];

  constructor(private auth: AuthService,) { }

  ngOnInit(): void {
    this.user$ = this.auth.currentUserSubject.asObservable();
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

}
