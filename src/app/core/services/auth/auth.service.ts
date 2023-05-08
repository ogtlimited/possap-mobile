/* eslint-disable @typescript-eslint/naming-convention */
import {
  authEndpoints,
  baseEndpoints,
  miscEndpoint,
  officerEndpoints,
} from './../../config/endpoints';
import { RequestService } from './../../request/request.service';
import { Injectable } from '@angular/core';
import { map, tap, switchMap } from 'rxjs/operators';
import { BehaviorSubject, from, Observable, of, Subject } from 'rxjs';
import { Preferences as Storage } from '@capacitor/preferences';
import { Router } from '@angular/router';
import { GlobalService } from '../global/global.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpHeaders } from '@angular/common/http';

const TOKEN_KEY = 'my-token';
const CURRENT_USER = 'current-user';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    null
  );
  currentUser$: BehaviorSubject<any> = new BehaviorSubject<boolean>(null);
  token = '';

  constructor(private reqS: RequestService, private globalS: GlobalService) {
    this.loadToken();
    this.currentUser().subscribe((e) => {
      console.log(e);
      this.currentUser$.next(JSON.parse(e.value));
    });
  }

  async loadToken() {
    const user = await Storage.get({ key: CURRENT_USER });
    const jwtHelper = new JwtHelperService();

    if (user && user.value) {
      // this.token = token.value;
      // const expirationDate = jwtHelper.getTokenExpirationDate(this.token);
      // console.log(expirationDate instanceof Date, 'expiration Date');
      // const isExpired = expirationDate < new Date();
      this.isAuthenticated.next(true);
    } else {
      this.isAuthenticated.next(false);
    }
  }
  async getToken() {
    const token = await Storage.get({ key: TOKEN_KEY });
    return token && token.value ? token.value : null;
  }

  login(credentials): Observable<any> {
    const body = new URLSearchParams();
    body.set('UserName', credentials.UserName);
    body.set('Password', credentials.Password);

    const options = {
      headers: new HttpHeaders().set(
        'Content-Type',
        'application/x-www-form-urlencoded'
      ),
    };
    return this.reqS.post(authEndpoints.login, body, options).pipe(
      switchMap((res: any) => {
        console.log(res);
        // this.currentUser$.next(res.data);
        if (res.Error) {
          this.isAuthenticated.next(false);
          return of(res);

        } else {
          this.isAuthenticated.next(true);
          return from(
            Storage.set({
              key: CURRENT_USER,
              value: JSON.stringify(res.ResponseObject),
            })
          );
        }
      })
    );
  }
  signup(credentials: { name; email; password }): Observable<any> {
    return this.reqS.post(authEndpoints.signup, credentials).pipe(
      switchMap((res: any) =>
        from(
          Storage.set({ key: CURRENT_USER, value: JSON.stringify(res.data) })
        )
      ),
      tap((_) => {
        console.log('authenticated');
      })
    );
  }
  getNIN(nin): Observable<any> {
    const queryParams = {
      nin,
    };
    const url = this.globalS.getUrlString(baseEndpoints.nin, queryParams);
    return this.reqS.get(url);
  }
  getAPNumber(apNumber): Observable<any> {
    const obj = {
      ServiceNumber: apNumber,
    };
    return this.reqS.post(baseEndpoints.apNumber, obj);
  }
  validateOTP(credentials: { apNumber; code; phone }): Observable<any> {
    return this.reqS.post(officerEndpoints.validate, credentials).pipe(
      switchMap((res: any) => {
        console.log(res.data);
        from(
          Storage.set({
            key: CURRENT_USER,
            value: JSON.stringify(res.data.officer),
          })
        );
        return from(
          Storage.set({ key: TOKEN_KEY, value: res.data.token.token })
        );
      }),
      tap((_) => {
        this.isAuthenticated.next(true);
      })
    );
  }
  forgotPasswordInitiate(credentials: { email }): Observable<any> {
    return this.reqS.post(authEndpoints.forgotPasswordInitiate, credentials);
  }
  forgotPasswordComplete(credentials: {
    email;
    verificationCode;
    password;
  }): Observable<any> {
    return this.reqS.post(authEndpoints.forgotPasswordComplete, credentials);
  }
  changePassword(credentials: { oldPassword; newPassword }): Observable<any> {
    return this.reqS.post(authEndpoints.changePassword, credentials);
  }
  updateUser(id, credentials): Observable<any> {
    return this.reqS.put(baseEndpoints.officer + '/' + id, credentials).pipe(
      switchMap((res: any) => {
        console.log(res);
        this.currentUser$.next(res.data);
        return from(
          Storage.set({ key: CURRENT_USER, value: JSON.stringify(res.data) })
        );
      })
    );
  }

  uploadProfileImage(formData): Observable<any> {
    return this.reqS.post(miscEndpoint.mediaUpload, formData);
  }
  currentUser(): Observable<any> {
    return from(Storage.get({ key: CURRENT_USER }));
  }

  logout(): Promise<void> {
    this.isAuthenticated.next(false);
    Storage.remove({ key: CURRENT_USER });
    Storage.remove({ key: 'my_cart' });
    return Storage.remove({ key: TOKEN_KEY });
  }
}
