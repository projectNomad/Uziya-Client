import { HttpHeaders } from '@angular/common/http';
import {environment} from '../../../environments/environment';

export default class GlobalService {

  getHeaders(contentType = 'application/json') {
    const token = localStorage.getItem(environment.cookiesName.token);

    if (token) {
      return new HttpHeaders({
        'Content-Type': contentType,
        Authorization: 'Token ' + token
      });
    }
    return new HttpHeaders({
      'Content-Type': contentType,
    });
  }
}
