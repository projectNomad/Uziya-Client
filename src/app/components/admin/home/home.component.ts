import {Component, OnInit } from '@angular/core';


import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';

import {VideoService} from '../../../services/video.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [NgbDropdownConfig]
})
export class HomeComponent implements OnInit {
  breadcrumb: any[];

  constructor() {}

  ngOnInit() {
  }
}
