import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import {Video} from '../../../../models/video.model';

@Component({
  selector: 'app-details-video',
  templateUrl: './details-video.component.html',
  styleUrls: ['./details-video.component.scss']
})
export class DetailsVideoComponent implements OnInit {

  @Input() video: Video;
  @Output() closeDetailInfo = new EventEmitter();

  isShowVideoMenu = false;

  constructor() { }

  ngOnInit() {
  }

  activeVideoMenu() {
    this.isShowVideoMenu = !this.isShowVideoMenu;
  }

  hideVideoInfos(event) {
    this.closeDetailInfo.emit(event);
  }
}
