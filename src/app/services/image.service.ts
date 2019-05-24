import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

import ServiceCore from './core/ServiceCore';

@Injectable({
  providedIn: 'root'
})
export class ImageService extends ServiceCore {

  constructor(
    private httpClient: HttpClient
  ) {
    super();
  }

  public uploadImage(data): Observable<Response> {

    return this.httpClient.post<any>(
        environment.paths_api.images.create,
        data
      );
  }
}
