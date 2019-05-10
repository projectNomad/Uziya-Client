import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

import ServiceCore from './core/ServiceCore';

interface AuthenticationResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService extends ServiceCore {

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
    return this.httpClient.post<any>(
      environment.paths_api.reset_password,
      {
        email
      },
    );
  }

  changePassword(token: string, password: string): Observable<any> {
    return this.httpClient.post<any>(
      environment.paths_api.change_password,
      {
        token,
        new_password: password
      },
    );
  }

  isAuthenticated() {
    const token = localStorage.getItem(environment.cookiesName.token);

    if (token) {
      return true;
    }

    return false;
  }

  getProfile() {
    return JSON.parse(localStorage.getItem(environment.cookiesName.profile));
  }

  isAdmin() {
    const profile = this.getProfile();
    let result = false;

    if (profile && this.isAuthenticated()) {
      profile.groups.find(group => {
        result = group.name === environment.groups.producer;
      });
    }

    return result;
  }

  logout() {
    localStorage.removeItem(environment.cookiesName.token);
    localStorage.removeItem(environment.cookiesName.profile);
  }
}
