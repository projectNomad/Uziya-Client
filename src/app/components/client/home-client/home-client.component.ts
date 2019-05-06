import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {map, tap} from 'rxjs/operators';

import {VideoService} from '../../../services/video.service';
import {Video} from '../../../models/video.model';
import {Observable} from 'rxjs';

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
    this.videos$ = this.videoService.getListVideos()
      .pipe(tap(
        value => {
          this.videosLength = value.count;
        }
      ))
      .pipe(map(result => result.results));
  }

}
