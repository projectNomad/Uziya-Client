import {Component, OnInit, Input, Renderer2, ElementRef, ViewChild} from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

import {Video} from '../../../../models/video.model';

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
  ]
})
export class GroupVideosPosterComponent implements OnInit {

  @Input() title: string;
  @Input() videos: Video[];
  @Input() videosLength: number;

  footerMenus: any[];
  isShowVideoInfos = false;
  videoCurrentClick: Video;
  isVideoScroll: boolean;
  isShowVideoMenu = false;
  elementImgActive: any;
  @ViewChild('videosElements') videosElements: ElementRef;


  constructor(
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    this.isVideoScroll = this.videosLength < 10;
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

  showVideoInfos(video: Video, event) {
    this.elementImgActive = null;
    this.videoCurrentClick = video;
    this.isShowVideoInfos = true;
    this.elementImgActive = event.target
    this.renderer.addClass(this.elementImgActive, 'active');
  }

  hideVideoInfos(event) {
    this.isShowVideoInfos = false;
    this.renderer.removeClass(this.elementImgActive, 'active');
  }

  activeVideoMenu() {
    this.isShowVideoMenu = !this.isShowVideoMenu;
  }
}
