import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

import {NotificationsService} from 'angular2-notifications';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import {User} from '../../../../models/user';
import {Genre, Video} from '../../../../models/video.model';
import {AuthService} from '../../../../services/auth.service';
import {VideoService} from '../../../../services/video.service';

@Component({
  selector: 'app-update-video',
  templateUrl: './update-video.component.html',
  styleUrls: ['./update-video.component.scss'],
  providers: [NgbModalConfig, NgbModal]
})
export class UpdateVideoComponent implements OnInit {
  breadcrumb = [
    {
      title: 'home',
      link: '/admin'
    },
    {
      title: 'videos',
      link: '/admin/videos/'
    }
  ];
  buttonsEnd = [
    {
      title: 'update',
      link: null
    },
  ];
  formUpdateVideo: FormGroup;
  video: Video;
  user: User;
  genres$: Observable<Genre[]>;
  videoGenres: Genre[];

  constructor(
    private formUpdateVideoBuider: FormBuilder,
    private videoService: VideoService,
    private authService: AuthService,
    private notificationService: NotificationsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    this.video = null;
  }

  ngOnInit() {
    this.initForm()
    this.user = this.authService.getProfile();
    this.genres$ = this.videoService.getListGenres()
      .pipe(map(result => result.results));
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    this.videoService.getVideo(+id).subscribe(
      value => {
        this.video = value;
        this.videoGenres = this.video.genres;
        this.breadcrumb.push({
          title: this.video.title,
          link: '/admin/videos/details/' + this.video.id
        });
      },
      error => {
        this.notificationService.error(null, 'video not found');
        this.router.navigate(['/video/auth']);
      },
      () => {
        this.initForm();
      }
    );
  }

  initForm() {
    this.formUpdateVideo = this.formUpdateVideoBuider.group({
      id: [this.video ? this.video.id : null, [Validators.required]],
      active: [this.video ? this.video.is_active ? '1' : '0' : '0', [Validators.required]],
      title: [this.video ? this.video.title : null],
      description: [this.video ? this.video.description : null],
      genres: [null]
    });
  }

  onSuccessForm(event) {
    if (event) {
      this.notificationService.success(null, 'Modification réussie');
      this.router.navigate(['/admin/videos/details/', this.video.id]);
    } else {
      this.notificationService.error(null, 'Erreur lors de la modification');
    }
  }

}
