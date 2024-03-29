import { requestEndpoints, baseEndpoints } from './../config/endpoints';
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
  getRequest(id) {
    return this.reqS.get(baseEndpoints.possapSserviceFields + '/' + id);
  }
  getOfficerRequests(officerId) {
    return this.reqS.get(requestEndpoints.officerRequest + '/' + officerId);
  }
  approveRequests(officerId, data) {
    return this.reqS.put(requestEndpoints.approveReject + '/' + officerId, data);
  }
}
