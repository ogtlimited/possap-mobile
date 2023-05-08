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

@Injectable({
  providedIn: 'root',
})
export class PossapServiceService {
  constructor(private reqS: RequestService, private globalS: GlobalService) {}

  getAllServices() {
    return this.reqS.get('');
  }
  getRequestDetails(id) {
    return this.reqS.get(requestEndpoints.requestDetails + '/' + id);
  }
  getOfficerRequests(body) {
    return this.reqS.post(middlewareEndpoints.fetchRequest, body);
  }
  approveRequests(endpoint, officerId, data) {
    return this.reqS.post(endpoint + '/' + officerId, data);
  }
  rejectRequests(endpoint, officerId, data) {
    return this.reqS.post(endpoint + '/' + officerId, data);
  }


}
