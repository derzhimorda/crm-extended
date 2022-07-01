import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {TranslationService} from './modules/i18n';
// language list
import {locale as enLang} from './modules/i18n/vocabs/en';
import {locale as ruLang} from './modules/i18n/vocabs/ru';
import {locale as uaLang} from './modules/i18n/vocabs/ua';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'body[root]',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  constructor(private translationService: TranslationService) {
    // register translations
    this.translationService.loadTranslations(
      enLang,
      ruLang,
      uaLang
    );
    this.translationService.setLanguage('ru');
  }

  ngOnInit() {}
}
