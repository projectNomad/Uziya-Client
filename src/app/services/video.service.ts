import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

import {UploadInput} from 'ngx-uploader';

import {Video, Genre} from '../models/video.model';
import {PagedResults} from '../models/base';
import {I18nService} from './core/i18n.service';
import ServiceCore from './core/ServiceCore';

@Injectable({
  providedIn: 'root'
})
export class VideoService extends ServiceCore {

  constructor(
    private httpClient: HttpClient,
    private i18nService: I18nService
  ) {
    super();
  }

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

  public updateVideo(video: any): Observable<any> {
    return this.httpClient.patch<any>(
      environment.paths_api.video.update + video.id,
      video);
  }

  public getListVideos(params: {
    offset?: number;
    limit?: number;
    videoUser?: boolean;
    is_actived?: boolean;
    is_deleted?: boolean;
  }): Observable<PagedResults<Video>> {

    return this.httpClient.get<PagedResults<Video>>(
      environment.paths_api.video.create_list,
      {
        params: this.toHttpParams(params)
      }
    );
  }

  public getVideo(id: number): Observable<Video> {
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
  public getListGenres(): Observable<PagedResults<Genre>> {

    return this.httpClient.get<PagedResults<Genre>>(
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
