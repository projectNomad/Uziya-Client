import {Component, EventEmitter, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import {Router} from '@angular/router';

import {VideoService} from '../../../../services/video.service';
import {humanizeBytes, UploaderOptions, UploadFile, UploadInput, UploadOutput, UploadStatus} from 'ngx-uploader';
import {NgSelectConfig} from '@ng-select/ng-select';
import {NotificationsService} from 'angular2-notifications';
import {_} from '@biesbjerg/ngx-translate-extract/dist/utils/utils';

import {Genre} from '../../../../models/video.model';


@Component({
  selector: 'app-register-video',
  templateUrl: './register-video.component.html',
  styleUrls: ['./register-video.component.scss']
})
export class RegisterVideoComponent implements OnInit {
  options: UploaderOptions;
  files: UploadFile[];
  uploadInput: EventEmitter<UploadInput>;
  humanizeBytes: Function;
  dragOver: boolean;
  errors: string[];
  videos: object[];
  showFormVideo: boolean;
  genres$: Observable<Genre[]>;
  breadcrumb: any[];

  constructor(
    private videoService: VideoService,
    private notificationService: NotificationsService,
    private config: NgSelectConfig,
    private router: Router
  ) {
    this.config.notFoundText = _('admin.videos.uploadVideo.videoNotFound');
    this.options = {
      concurrency: 1,
      // allowedContentTypes: ['mp4'],
      maxUploads: 1
    };
    this.files = []; // local uploading files array
    this.uploadInput = new EventEmitter<UploadInput>(); // input events, we use this to emit data to ngx-uploader
    this.humanizeBytes = humanizeBytes;
    this.errors = [];
    this.videos = [];
    this.showFormVideo = false;
    this.breadcrumb = [
      {
        title: 'home',
        link: '/admin'
      },
      {
        title: 'videos',
        link: '/admin/videos'
      },
      {
        title: 'upload',
        link: null
      },
    ];
  }

  onUploadOutput(output: UploadOutput): void {
    if (output.type === 'allAddedToQueue') {
      // if you want to start the upload directly
    } else if (output.type === 'addedToQueue' && typeof output.file !== 'undefined') {
      this.errors = [];
      this.files.push(output.file);
    } else if (output.type === 'uploading' && typeof output.file !== 'undefined') {
      const index = this.files.findIndex(
        file => typeof output.file !== 'undefined' && file.id === output.file.id
      );
      this.files[index] = output.file;
    } else if (output.type === 'cancelled' || output.type === 'removed') {
      this.files = this.files.filter((file: UploadFile) => file !== output.file);
    } else if (output.type === 'dragOver') {
      this.dragOver = true;
    } else if (output.type === 'dragOut') {
      this.dragOver = false;
    } else if (output.type === 'drop') {
      this.dragOver = false;
    } else if (output.type === 'rejected' && typeof output.file !== 'undefined') {
      this.errors.push(output.file.name + ' rejected.');
    } else if (output.type === 'done' && typeof output.file.response !== 'undefined') {

      if (output.file.response.hasOwnProperty('file') &&
        typeof output.file.response.file === 'object' ||
        output.file.responseStatus !== 201) {
        this.errors.push(output.file.response.message);
        this.files = [];
        return;
      }
      this.videos.push(output.file.response);
      this.showFormVideo = true;
      // this.initForm();
    }

    this.files = this.files.filter(file => file.progress.status !== UploadStatus.Done);
  }

  ngOnInit() {
    this.genres$ = this.videoService.getListGenres()
      .pipe(map(result => result.results));
  }

  startUpload(): void {
    this.uploadInput.emit(this.videoService.createNewVideo());
  }

  cancelUpload(id: string): void {
    this.uploadInput.emit({ type: 'cancel', id });
  }

  removeFile(id: string): void {
    this.uploadInput.emit({ type: 'remove', id });
  }

  removeAllFiles(): void {
    this.uploadInput.emit({ type: 'removeAll' });
    this.files = [];
  }

  onSuccessForm(event) {
    if (event) {
      this.notificationService.success(null, 'Video enregistrer');
      this.router.navigate(['/admin/videos/']);
    } else {
      this.notificationService.error(null, 'Erreur lors de l\'enregistrement');
    }
  }
}
