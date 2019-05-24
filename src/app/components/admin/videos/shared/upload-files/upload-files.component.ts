import {Component, Input, OnInit} from '@angular/core';

import { ImageService} from '../../../../../services/image.service';
import {Video} from '../../../../../models/video.model';
import {NotificationsService} from 'angular2-notifications';


@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.scss']
})
export class UploadFilesComponent implements OnInit {
  @Input() video: Video;
  selectedFile: File;
  imagePreview: string | ArrayBuffer;

  constructor(
    private imageService: ImageService,
    private notificationsService: NotificationsService
  ) { }

  ngOnInit() {}

  onFileUpload(event) {
    this.selectedFile = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(this.selectedFile);
  }

  OnUploadFile() {
    const uploadFormData = new FormData();
    uploadFormData.append('file', this.selectedFile, this.selectedFile.name);
    uploadFormData.append('video', String(this.video.id));
    // console.log(uploadFormData.get('file'));
    this.imageService.uploadImage(uploadFormData).subscribe(
      value => {
        this.notificationsService.success(null, 'Image ajoutée');
      },
      err => {
        this.notificationsService.error(null, 'Erreur lors du transfert');
      }
    );
  }
}
