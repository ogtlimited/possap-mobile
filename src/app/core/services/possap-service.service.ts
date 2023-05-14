/* eslint-disable @typescript-eslint/naming-convention */
import {
  requestEndpoints,
  baseEndpoints,
  serviceEndpoint,
  middlewareEndpoints,
} from './../config/endpoints';
import { Injectable } from '@angular/core';
import { RequestService } from '../request/request.service';
import { GlobalService } from './global/global.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PossapServiceService {
  constructor(private reqS: RequestService, private globalS: GlobalService) {}

  getAllServices() {
    return this.reqS.get('');
  }
  getRequestDetails(id, obj) {
    return this.reqS.post(requestEndpoints.requestDetails, obj);
  }
  postRequests(body): Observable<any> {
    return this.reqS.post(middlewareEndpoints.fetchRequest, body);
  }
  approveRequests(endpoint, officerId, data) {
    return this.reqS.post(endpoint + '/' + officerId, data);
  }
  rejectRequests(endpoint, officerId, data) {
    return this.reqS.post(endpoint + '/' + officerId, data);
  }


}
