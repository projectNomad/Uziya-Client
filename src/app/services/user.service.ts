import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import GlobalService from './globalService';

@Injectable({
  providedIn: 'root'
})
export class UserService extends GlobalService {

  urlProfile = environment.url_base_api + environment.paths_api.profile;
  // urlActivation = environment.url_base_api + environment.paths_api.activation;
  // urlSaveUser = environment.url_base_api + environment.paths_api.users;
  // urlUpdateUser = environment.url_base_api + environment.paths_api.profile;

  constructor(private httpClient: HttpClient) {
    super();
  }

  getProfile(): Observable<any> {
    const headers = this.getHeaders();
    return this.httpClient.get<any>(
      this.urlProfile,
      {headers}
    );
  }

  // activate(token: string): Observable<any> {
  //   const headers = this.getHeaders();
  //   return this.httpClient.post<any>(
  //     this.urlActivation,
  //     {
  //       activation_token: token
  //     },
  //     {headers}
  //   );
  // }
  //
  // createNewUser(user): Observable<any> {
  //   const headers = this.getHeaders();
  //   return this.httpClient.post<any>(
  //     this.urlSaveUser,
  //     user,
  //     {headers});
  // }
  //
  // updateUser(user): Observable<any> {
  //   const headers = this.getHeaders();
  //   return this.httpClient.patch<any>(
  //     this.urlUpdateUser,
  //     user,
  //     {headers});
  // }
  //
  // changePassword(id: number, password: string, newPassword: string): Observable<any>  {
  //   const headers = this.getHeaders();
  //   return this.httpClient.patch<any>(
  //     this.urlProfile,
  //     {
  //       password,
  //       newPassword
  //     },
  //     {headers}
  //   );
  // }
}
