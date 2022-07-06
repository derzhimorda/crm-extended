import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { TranslationService } from '../../../../../../modules/i18n';
import { AuthService, UserType } from '../../../../../../modules/auth';
import {NgbDropdownConfig} from "@ng-bootstrap/ng-bootstrap";
import {NgSelectConfig} from "@ng-select/ng-select";

@Component({
  selector: 'app-user-inner',
  templateUrl: './user-inner.component.html',
  providers: [NgbDropdownConfig]
})
export class UserInnerComponent implements OnInit, OnDestroy {
  @HostBinding('class')
  class = `menu-column menu-rounded menu-gray-600 menu-state-bg menu-state-primary fw-bold py-4 fs-6 w-275px`;
  @HostBinding('attr.data-kt-menu') dataKtMenu = 'true';

  language: LanguageFlag;
  user$: Observable<UserType>;
  langs = languages;
  private unsubscribe: Subscription[] = [];

  constructor(
    private auth: AuthService,
    private translationService: TranslationService,
    private config: NgSelectConfig
  ) {}

  ngOnInit(): void {
    this.user$ = this.auth.currentUserSubject.asObservable();

    this.setLanguage(this.translationService.getSelectedLanguage());
  }

  logout() {
    this.auth.logout();
    document.location.reload();
  }

  selectLanguage(lang: string) {
    this.translationService.setLanguage(lang);
    this.setLanguage(lang);
    // document.location.reload();
  }

  setLanguage(lang: string) {
    this.langs.forEach((language: LanguageFlag) => {
      if (language.lang === lang) {
        language.active = true;
        this.language = language;
      } else {
        language.active = false;
      }
    });
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}

interface LanguageFlag {
  lang: string;
  name: string;
  flag: string;
  active?: boolean;
}

const languages = [
  {
    lang: 'en',
    name: 'English',
    flag: './assets/media/flags/united-states.svg',
  },
  {
    lang: 'ru',
    name: 'Russian',
    flag: './assets/media/flags/russia.svg',
  },
  {
    lang: 'ua',
    name: 'Ukraine',
    flag: './assets/media/flags/ukraine.svg',
  },
];
