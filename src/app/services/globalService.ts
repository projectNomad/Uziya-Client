import { HttpHeaders } from '@angular/common/http';
import {environment} from '../../environments/environment';

export default class GlobalService {

  getHeaders(contentType = 'application/json') {

    const token = localStorage.getItem('token');
    if (token) {
      return new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Token ' + token
      });
    }
    return new HttpHeaders({
      'Content-Type': 'application/json',
    });
  }
}
