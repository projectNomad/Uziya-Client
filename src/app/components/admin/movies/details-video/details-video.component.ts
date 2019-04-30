import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {NotificationsService} from 'angular2-notifications';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import {MoviesService} from '../../../../services/movies.service';
import {AuthService} from '../../../../services/auth.service';
import {Video} from '../../../../models/video.model';
import {User} from '../../../../models/user';

@Component({
  selector: 'app-details-video',
  templateUrl: './details-video.component.html',
  styleUrls: ['./details-video.component.scss'],
  providers: [NgbModalConfig, NgbModal]
})
export class DetailsVideoComponent implements OnInit {
  breadcrumb = [
    {
      title: 'home',
      link: '/admin'
    },
    {
      title: 'movies',
      link: '/admin/movies/'
    }
  ];
  buttonsEnd = [
    {
      title: 'upload video',
      link: '/admin/movies/upload'
    },
  ];
  video: Video;
  user: User;
  videoAtDelete: Video;
  pathViewFile: string;

  constructor(
    private videoService: MoviesService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private notificationService: NotificationsService,
    private router: Router,
    config: NgbModalConfig,
    private modalService: NgbModal
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
    this.videoAtDelete = null;
  }

  ngOnInit() {
    this.user = this.authService.getProfile();
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    this.videoService.getVideo(+id).subscribe(
      value => {
        this.video = value;
        this.breadcrumb.push({
          title: this.video.title,
          link: null
        });
        this.pathViewFile = this.getPathVideo();
      },
      error => {
        console.log(error);
      }
    );
  }

  getPathVideo() {
    const arrayPath = this.video.file.split('/');
    arrayPath.splice(3, 1);
    return arrayPath.join('/');
  }

  deleteVideo() {
    const videoAtDeleted = {
      id: this.videoAtDelete.id,
      title: this.videoAtDelete.title,
      description: this.videoAtDelete.description,
      is_deleted: new Date()
    };

    this.videoService.deleteVideo(videoAtDeleted)
      .subscribe(
      value => {
        const videoTitle = value.title ? value.title : 'video no title';
        this.notificationService.error(
          null,
          videoTitle + ' a été supprimée');
      },
      error => {
        console.log(error);
      },
      () => {
        this.modalService.dismissAll();
        this.router.navigate(['/admin/movies']);
      }
    );
  }

  active_modal(content, video: Video) {
    this.modalService.open(content);
    this.videoAtDelete = video;
  }
}
