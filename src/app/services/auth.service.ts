import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

import GlobalService from './globalService';

interface AuthenticationResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService extends GlobalService {

  constructor(private httpClient: HttpClient) {
    super();
  }

  authenticate(email: string, password: string): Observable<AuthenticationResponse> {
    return this.httpClient.post<AuthenticationResponse>(
      environment.paths_api.authentication,
      {
        login: email,
        password,
      }
    );
  }

  resetPassword(email: string): Observable<any> {
    // const headers = this.getHeaders();
    return this.httpClient.post<any>(
      environment.paths_api.reset_password,
      {
        email
      },
      // {headers}
    );
  }

  changePassword(token: string, password: string): Observable<any> {
    // const headers = this.getHeaders();
    return this.httpClient.post<any>(
      environment.paths_api.change_password,
      {
        token,
        new_password: password
      },
      // {headers}
    );
  }

  isAuthenticated() {
    const token = localStorage.getItem('token');

    if (token) {
      return true;
    }

    return false;
  }

  getProfile() {
    return JSON.parse(localStorage.getItem('userProfile'));
  }
}
