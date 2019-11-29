import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

import {environment} from '../../environments/environment';
import ServiceCore from './core/ServiceCore';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService extends ServiceCore {

  constructor(private httpClient: HttpClient) {
    super();
  }

  getProfile(): Observable<User> {
    return this.httpClient.get<User>(
      environment.paths_api.profile
    );
  }

  activate(token: string): Observable<any> {
    return this.httpClient.post<any>(
      environment.paths_api.activation,
      {
        activation_token: token
      },
    );
  }

  createNewUser(user): Observable<any> {
    return this.httpClient.post<any>(
      environment.paths_api.users,
      user
    );
  }

  updateUser(url, values): Observable<any> {
    const urlString = url.split('//')[1].split('/');
    return this.httpClient.patch<any>(
      '/' + urlString[1] + '/' + urlString[2],
      values
    );
  }

  updatePassword(password: string, newPassword: string): Observable<any>  {
    return this.httpClient.patch<any>(
      environment.paths_api.update_password,
      {
        password,
        newPassword
      }
    );
  }
}
