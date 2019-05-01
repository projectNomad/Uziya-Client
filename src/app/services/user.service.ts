import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

import {environment} from '../../environments/environment';
import GlobalService from './core/globalService';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService extends GlobalService {

  constructor(private httpClient: HttpClient) {
    super();
  }

  getProfile(): Observable<User> {
    // const headers = this.getHeaders();
    return this.httpClient.get<User>(
      environment.paths_api.profile,
      // {headers}
    );
  }

  activate(token: string): Observable<any> {
    const headers = this.getHeaders();
    return this.httpClient.post<any>(
      environment.paths_api.activation,
      {
        activation_token: token
      },
      {headers}
    );
  }

  createNewUser(user): Observable<any> {
    const headers = this.getHeaders();
    return this.httpClient.post<any>(
      environment.paths_api.users,
      user,
      {headers});
  }

  updateUser(user): Observable<any> {
    const headers = this.getHeaders();
    return this.httpClient.patch<any>(
      environment.paths_api.profile,
      user,
      {headers});
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
