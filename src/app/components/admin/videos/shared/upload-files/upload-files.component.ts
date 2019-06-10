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
  loader = false;
  btnLoader = false;
  imagePreview: string | ArrayBuffer;

  constructor(
    private imageService: ImageService,
    private notificationsService: NotificationsService
  ) { }

  ngOnInit() {}

  onFileUpload(event) {
    this.loader = true;
    this.selectedFile = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
      this.loader = false;
    };
    reader.readAsDataURL(this.selectedFile);

  }

  OnUploadFile() {
    this.loader = true;
    this.btnLoader = true;
    //
    const uploadFormData = new FormData();
    uploadFormData.append('file', this.selectedFile, this.selectedFile.name);
    uploadFormData.append('video', String(this.video.id));
    this.imageService.uploadImage(uploadFormData).subscribe(
      value => {
        console.log(value)
        // this.imagePreview = value.hostPathFile;
        this.loader = false;
        this.btnLoader = false;
        this.notificationsService.success(null, 'Image ajoutée');
      },
      err => {
        this.notificationsService.error(null, 'Erreur lors du transfert');
      }
    );
  }
}
