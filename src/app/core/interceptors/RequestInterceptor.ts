import { serverBaseUrl } from '../config/endpoints';

import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';

import { switchMap } from 'rxjs/operators';
import { AuthService } from '../services/auth/auth.service';
import { environment } from 'src/environments/environment.prod';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    const externalUrl = request.url.startsWith(serverBaseUrl);
    const headers = request.headers.set('CLIENTID', environment.clientId);

    const requestClone = request.clone({
      headers,
    });
    return next.handle(requestClone);
    // return from(this.authService.getToken())
    //           .pipe(
    //             switchMap(token => {
    //                const headers = request.headers
    //                         .set('CLIENTID', environment.clientId);

    //                const requestClone = request.clone({
    //                  headers
    //                 });
    //               return next.handle(requestClone);
    //             })
    //            );
  }
}
