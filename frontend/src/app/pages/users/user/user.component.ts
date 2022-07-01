import { Component, OnInit } from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {AuthService, UserType} from "../../../modules/auth";
import {TranslationService} from "../../../modules/i18n";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  user$: Observable<UserType>;
  private unsubscribe: Subscription[] = [];
  constructor(
    private auth: AuthService,
    private translationService: TranslationService
    ) { }

  ngOnInit(): void {
    this.user$ = this.auth.currentUserSubject.asObservable();
    console.log(this.user$)
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

}
