import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

import {NotificationsService} from 'angular2-notifications';
import {NgbModal, NgbModalConfig,} from '@ng-bootstrap/ng-bootstrap';
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
  genreAtDelete: Genre;

  constructor(
    private formUpdateVideoBuider: FormBuilder,
    private videoService: VideoService,
    private authService: AuthService,
    private notificationService: NotificationsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private modalService: NgbModal
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
      },
      error => {
        this.notificationService.error(null, 'video not found');
        this.router.navigate(['/video/user']);
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

  onSubmit() {
    const video = {
      id: this.formUpdateVideo.get('id').value,
      title: this.formUpdateVideo.get('title').value,
      description: this.formUpdateVideo.get('description').value,
      is_actived: (this.formUpdateVideo.get('active').value === '1') ? new Date : new Date('1960-01-01'),
      genres: this.formUpdateVideo.get('genres').value,
    };

    this.videoService.updateVideo(video, video.id).subscribe(
      value => {
        if (value) {
          this.notificationService.success(null, value.title + ' a été modifiée');
        } else {
          this.notificationService.error(null, 'Erreur lors de la modification');
        }
      },
      error => {
        console.log(error);
      },
      () => {
        this.router.navigate(['/admin/videos/details/', this.video.id]);
      }
    );
  }

  delGenre() {
    this.videoService.delGenreVideo(this.video.id, this.genreAtDelete.id).subscribe(
      value => {
        if (value) {
          this.videoGenres = this.videoGenres.filter(
            (genre: Genre) => genre.label !== value
          );
          this.notificationService.success(null, value + ' deleted');
        } else {
          this.notificationService.error(null, 'Erreur lors de la modification');
        }
      },
      error => {
        console.log(error);
      },
      () => {
        this.modalService.dismissAll();
      }
    );
  }

  active_modal(content, genre: Genre) {
    this.modalService.open(content);
    this.genreAtDelete = genre;
  }

}
