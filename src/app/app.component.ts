import { Component } from '@angular/core';

import {TranslateService} from '@ngx-translate/core';
import {environment} from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Client-Uziya';

  public options = {
    position: ['bottom', 'right'],
    timeOut: 3000,
    lastOnBottom: true,
    preventDuplicates: true,
  };

  constructor(private translate: TranslateService) {
    translate.setDefaultLang(environment.defaultLanguage);
  }
}
