import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {map, tap} from 'rxjs/operators';

import {VideoService} from '../../../services/video.service';
import {Video} from '../../../models/video.model';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-home-client',
  templateUrl: './home-client.component.html',
  styleUrls: ['./home-client.component.scss']
})
export class HomeClientComponent implements OnInit {
  videos$: Observable<Video[]>;
  videosLength: number;

  constructor(
    private router: Router,
    private videoService: VideoService
  ) { }

  ngOnInit() {
    this.videos$ = this.videoService.getListVideos({
      limit: environment.videos.limitVideosGroup,
      is_actived: true
    })
      .pipe(tap(
        value => {
          this.videosLength = value.results.length;
        }
      ))
      .pipe(map(result => result.results));
  }
}
