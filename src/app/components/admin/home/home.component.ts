import { Component, OnInit } from '@angular/core';

import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [NgbDropdownConfig]
})
export class HomeComponent implements OnInit {
  breadcrumb: any[];

  constructor() {
    this.breadcrumb = [
      {
        title: 'home',
        link: null
      }
    ];
  }

  ngOnInit() {
  }

}
