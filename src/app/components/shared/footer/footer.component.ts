import { Component, OnInit } from '@angular/core';

import {I18nService} from '../../../services/core/i18n.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(private i18nService: I18nService) { }

  ngOnInit() {
  }

  useLanguage(language: string) {
    this.i18nService.language = language;
  }
}
