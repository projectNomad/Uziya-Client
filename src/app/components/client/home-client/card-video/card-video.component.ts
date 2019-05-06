import { Component, OnInit, Input } from '@angular/core';

import {NgbPopoverConfig} from '@ng-bootstrap/ng-bootstrap';

import {Video} from '../../../../models/video.model';

@Component({
  selector: 'app-card-video',
  templateUrl: './card-video.component.html',
  styleUrls: ['./card-video.component.scss'],
  providers: [NgbPopoverConfig]
})
export class CardVideoComponent implements OnInit {

  @Input() video = Video;

  constructor(
    config: NgbPopoverConfig
  ) {
    config.placement = 'right';
    config.triggers = 'hover';
  }

  ngOnInit() {
  }

}
