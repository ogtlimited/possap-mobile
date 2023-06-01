import { TestBed } from '@angular/core/testing';

import { PccApproverService } from './pcc-approver.service';

describe('PccApproverService', () => {
  let service: PccApproverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PccApproverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
