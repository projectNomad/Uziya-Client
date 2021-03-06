import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {UploadInput} from 'ngx-uploader';
import {PagedResults, Video} from '../models/video.model';
import {I18nService} from './core/i18n.service';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(
    private httpClient: HttpClient,
    private i18nService: I18nService
  ) { }

  public createNewVideo(): UploadInput {
    const currentLangage = this.i18nService.language;
    return  {
      type: 'uploadAll',
      url: environment.baseApiUrl + '/' + currentLangage + environment.paths_api.video.create_list,
      headers: { Authorization: 'token ' + localStorage.getItem(environment.cookiesName.token) },
      method: 'POST'
      // data: { foo: 'bar' }
    };
  }

  public updateVideo(video, id: number): Observable<any> {
    return this.httpClient.patch<any>(
      environment.paths_api.video.update + id,
      video);
  }

  public getListVideos() {

    return this.httpClient.get<any>(
      environment.paths_api.video.create_list,
    );
  }

  public getVideo(id: number) {
    return this.httpClient.get<Video>(
      environment.paths_api.video.update + id,
    );
  }

  public deleteVideo(video: any) {

    return this.httpClient.patch<any>(
      environment.paths_api.video.update + video.id,
      video);
  }

  /**
   * Services Genre
   */
  public getListGenres(): Observable<PagedResults<Video>> {

    return this.httpClient.get<PagedResults<Video>>(
      environment.paths_api.genre.list
    );
  }

  public delGenreVideo(videoId: number, genreId: number) {

    return this.httpClient.patch<any>(
      environment.paths_api.genre.delete,
      {genre: genreId, video: videoId}
    );
  }
}
