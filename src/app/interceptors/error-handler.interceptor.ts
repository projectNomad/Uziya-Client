/** Angular Imports */
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
/** Environment Configuration */
import {environment} from '../../environments/environment';
/** rxjs Imports */
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
/** Custom Services */
import { Logger} from '../services/core/logger.service';
import {Router} from '@angular/router';

import {NotificationsService} from 'angular2-notifications';
import {AuthService} from '../services/auth.service';

/** Initialize Logger */
const log = new Logger('ErrorHandlerInterceptor');

/**
 * Http Request interceptor to add a default error handler to requests.
 */
@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {

  constructor(
    private notificationService: NotificationsService,
    private authService: AuthService,
    private router: Router
  ) {}

  /**
   * Intercepts a Http request and adds a default error handler.
   */
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next
      .handle(request)
      .pipe(catchError(error => this.handleError(error)));
  }

  /**
   * Error handler.
   */
  private handleError(response: HttpErrorResponse): Observable<HttpEvent<any>> {
    const status = response.status;
    const endMessage = ' \n Please, contact us.';
    let errorMessage = response.error.developerMessage || response.message;

    if (response.error.errors) {
      if (response.error.errors[0]) {
        errorMessage =
          response.error.errors[0].defaultUserMessage ||
          response.error.errors[0].developerMessage;
      }
    }

    if (!environment.production) {
      log.error(`Request Error: ${errorMessage}`);
    }

    if (
      status === 403 &&
      errorMessage === 'The provided one time token is invalid'
    ) {
      this.notificationService.error('Error', 'Invalid Token. Please try again!' + endMessage);
    } else if (status === 400) {
      this.notificationService.error('Error', 'Invalid parameters were passed in the request!' + endMessage);
    } else if (status === 401) {
      this.authService.logout();
      this.router.navigate(['/auth']);
    } else if (status === 403) {
      this.notificationService.error('Error', 'You are not authorized for this request!' + endMessage);
    } else if (status === 404) {
      this.notificationService.error('Error', 'Resource does not exist!' + endMessage);
    } else if (status === 500) {
      this.notificationService.error('Error', 'Internal Server Error. Please try again later.' + endMessage);
    }

    throw response;
  }
}
