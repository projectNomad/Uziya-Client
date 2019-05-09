import { Component, OnInit, Input, Renderer2 } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {VideoService} from '../../../services/video.service';
import {Video} from '../../../models/video.model';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: [
    './css/icons.css',
    './css/video-player.component.css',
    './css/video.component.css',
    './video-player.component.scss'
  ]
})
export class VideoPlayerComponent implements OnInit {

  @Input() src: string = null;
  @Input() title: string = null;
  @Input() poster: string = null;
  @Input() preload: boolean;
  @Input() loop: boolean;
  @Input() autoplay: boolean;
  @Input() spinner: string;
  @Input() fullscreen: boolean;
  @Input() download: boolean;
  @Input() overlay: string = null;

  videoP: Video;
  video: HTMLVideoElement;

  constructor(
    private videoService: VideoService,
    private activatedRoute: ActivatedRoute,
    private renderer: Renderer2
  ) { }

  ngOnInit() {
    // this.video = this.matVideo.getVideoTag();
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    this.videoService.getVideo(+id).subscribe(
      value => {
        this.videoP = value;
      },
      error => {
        console.log(error);
      },
      () => {
        this.src = this.videoP.hostPathFile;
        this.overlay = null;
        this.title = this.videoP.title;
        this.preload = true;
        this.loop = true;
        this.autoplay = false;
        this.fullscreen = false;
        this.download = false;
        this.spinner = 'spin';
        this.poster = '';
      }
    );
    // this.renderer.listen(this.video, 'ended', () => console.log('video ended'));
    // this.video.addEventListener('ended', () => console.log('video ended'));
  }

  getOverlayClass(activeClass: string, inactiveClass: string): any {
    // if (this.overlay === null) {
    //   return (!this.playing || this.isMouseMoving) ? activeClass : inactiveClass;
    // } else {
    //   return this.overlay ? activeClass : inactiveClass;
    // }
  }
}
