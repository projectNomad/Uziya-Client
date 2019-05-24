import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

import {NgSelectConfig} from '@ng-select/ng-select';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import {NotificationsService} from 'angular2-notifications';
// import {_} from '@biesbjerg/ngx-translate-extract';

import {VideoService} from '../../../../../services/video.service';
import {Genre} from '../../../../../models/video.model';


@Component({
  selector: 'app-update-video-form',
  templateUrl: './update-video-form.component.html',
  styleUrls: ['./update-video-form.component.scss'],
  providers: [NgbModalConfig, NgbModal]
})
export class UpdateVideoFormComponent implements OnInit {

  @Input() video: any;
  @Output() formSuccess = new EventEmitter();

  formUpdateVideo: FormGroup;
  genres$: Observable<Genre[]>;
  genreHasDeleted: Genre;

  constructor(
    private formUpdateVideoBuider: FormBuilder,
    private videoService: VideoService,
    private configDropdown: NgSelectConfig,
    private notificationService: NotificationsService,
    private modalService: NgbModal,
    private configModal: NgbModalConfig
  ) {
    // this.configDropdown.notFoundText = _('admin.videos.uploadVideo.videoNotFound');
    this.configDropdown.notFoundText = 'bo';
    this.configModal.backdrop = 'static';
    this.configModal.keyboard = false;
  }

  ngOnInit() {
    this.initForm();
    this.genres$ = this.videoService.getListGenres()
      .pipe(map(result => result.results));
  }

  initForm() {
    this.formUpdateVideo = this.formUpdateVideoBuider.group({
      title: [this.video.title],
      active: [(this.video.is_active) ? '1' : '0', [Validators.required]],
      description: [this.video.description],
      genres: [null],
    });
  }

  onSubmitVideoUpdate() {
    const video = {
      id: this.video.id,
      title: this.formUpdateVideo.get('title').value,
      is_actived: (this.formUpdateVideo.get('active').value === '1') ? new Date() : new Date('1960-01-01'),
      description: this.formUpdateVideo.get('description').value,
      genres: this.formUpdateVideo.get('genres').value,
    };

    this.videoService.updateVideo(video).subscribe(
      value => {
        this.formSuccess.emit(true);
      },
      error => {
        this.formSuccess.emit(false);
      }
    );
  }

  delGenre() {
    this.videoService.delGenreVideo(this.video.id, this.genreHasDeleted.id).subscribe(
      value => {
        if (value) {
          this.video.genres = this.video.genres.filter(
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

  active_modal(content, genre) {
    this.genreHasDeleted = genre;
    this.modalService.open(content);
  }
}
