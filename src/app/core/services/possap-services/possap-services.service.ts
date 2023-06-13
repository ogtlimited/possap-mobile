import { AuthService } from 'src/app/core/services/auth/auth.service';
/* eslint-disable @typescript-eslint/naming-convention */
import { baseEndpoints, utilityEndpoint } from './../../config/endpoints';
import { Injectable } from '@angular/core';
import { RequestService } from '../../request/request.service';
import { GlobalService } from '../global/global.service';
import { environment } from 'src/environments/environment.prod';
import { Subscription } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { Preferences } from '@capacitor/preferences';

const SERVICES = 'CBS-SERVICES';
@Injectable({
  providedIn: 'root',
})
export class PossapServicesService {
  user;
  subscription: Subscription;

  constructor(
    private reqS: RequestService,
    private authS: AuthService
  ) {
    this.subscription = this.authS.currentUser$.subscribe(
      (e) => (this.user = e)
    );
  }

  fetchServices() {
    return this.reqS.get('assets/data/services.json');
    // return this.reqS.get(baseEndpoints.service);
  }
  fetchCBSServices() {
    return this.reqS.get(utilityEndpoint.services);
  }




}
