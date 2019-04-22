import { HttpHeaders } from '@angular/common/http';

export default class GlobalService {

  getHeaders(contentType = 'application/json') {
    const token = localStorage.getItem('token');

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
