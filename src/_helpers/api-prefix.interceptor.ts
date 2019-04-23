/** Angular Imports */
import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest, HttpHeaders
} from '@angular/common/http';

/** rxjs Imports */
import { Observable } from 'rxjs';

/** Environment Configuration */
import { environment} from '../environments/environment';
import {I18nService} from '../app/services/core/i18n.service';

/**
 * Http request interceptor to prefix a request with `environment.serverUrl`.
 */
@Injectable()
export class ApiPrefixInterceptor implements HttpInterceptor {

  constructor(
    private i18nService: I18nService
  ) {}
  /**
   * Intercepts a Http request and prefixes it with `environment.serverUrl`.
   */
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // by pass the traduction files
    if (request.url.indexOf('fr.json') > 0 || request.url.indexOf('en.json') > 0) {
      return next.handle(request);
    }

    const token = localStorage.getItem(environment.cookiesName.token);
    let header = new HttpHeaders({
      'Content-Type':  'application/json'
    });

    if (token) {
      header = header.append('Authorization', 'token ' + token);
    }
    const apiProvider = '/' + this.i18nService.language;

    return next.handle(request.clone({
      headers: header,
      url: environment.serverUrl + apiProvider + request.url
    }));
  }
}

