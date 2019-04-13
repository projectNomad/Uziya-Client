import { HttpHeaders } from '@angular/common/http';
import {environment} from '../../environments/environment';

export default class GlobalService {

  getHeaders(contentType = 'application/json') {
    const options = {
      'Content-Type': contentType,
      'Accept-Language': environment.default_language,
      Authorization: null,
    };

    const token = localStorage.getItem('token');
    if (token) {
      options.Authorization = 'Token ' + token;
    }
    const header = new HttpHeaders(options);
    return header;
  }
}
