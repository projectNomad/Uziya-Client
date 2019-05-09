import {Component, OnInit, Input} from '@angular/core';
import {animate, query, state, style, transition, trigger} from '@angular/animations';

import {Video} from '../../../../models/video.model';

const MAX_VIDEOS_VISIBLE = 10;

@Component({
  selector: 'app-group-videos-poster',
  templateUrl: './group-videos-poster.component.html',
  styleUrls: ['./group-videos-poster.component.scss'],
  animations: [
    trigger('animVideoInfos', [
      state('openVideoInfos', style({
        display: 'block'
      })),
      state('closedVideoInfos', style({
        display: 'none'
      })),
      transition('openVideoInfos => closedVideoInfos', [
        animate('1ms')
      ]),
      transition('closedVideoInfos => openVideoInfos', [
        animate('1ms 5ms')
      ]),
    ]),
    // trigger('animVideoBorderSelected', [
    //   transition('* => *', [
    //     query(':enter', [
    //       style({transform: 'translateX({{offsetEnter}}%)'}), animate('0.4s ease-in-out')
    //     ], {optional: true}),
    //     query(':leave', [
    //       style({transform: 'translateX(0%)'}),
    //       animate('0.4s ease-in-out', style({transform: 'translateX({{offsetEnter}}%)'}))
    //     ], {optional: true}),
    //   ])
    // ])
  ]
})
export class GroupVideosPosterComponent implements OnInit {

  @Input() title: string;
  @Input() videosLength: number;
  @Input() videos: Video[];

  footerMenus: any[];
  isVideoScroll: boolean;
  isShowVideoInfos = false;
  videoCurrent: Video;
  videoPositionCurrent = 0;
  videoPositions = [0, 208, 416, 624, 832, 1040, 1248, 1456, 1664, 1872];

  constructor(
  ) {}

  ngOnInit() {
    this.isVideoScroll = this.videosLength < MAX_VIDEOS_VISIBLE;
    this.footerMenus = [
      {
        title: 'Ajouter',
        link: 'Ajouter'
      },
      {
        title: 'Supprimer',
        link: 'Ajouter'
      },
    ];
  }

  onShowVideoInfos(video: Video, i: number) {
    this.isShowVideoInfos = true;
    this.videoCurrent = video;
    this.videoPositionCurrent = (i > MAX_VIDEOS_VISIBLE) ? MAX_VIDEOS_VISIBLE : i;
  }

  hideVideoInfos(event) {
    this.videoCurrent = null;
  }

  getTranslationBorderVideoSelected() {
    return `translateX(${this.videoPositions[this.videoPositionCurrent]}px)`;
  }

  // getState() {
  //   console.log('je suis getState', this.videoPositions[this.videoPositionCurrent])
  //   return {
  //     params: {
  //       offsetEnter: this.videoPositions[this.videoPositionCurrent]
  //     }
  //   };
  // }
}
