import { TestBed } from '@angular/core/testing';

import { PossapServiceService } from './possap-service.service';

describe('PossapServiceService', () => {
  let service: PossapServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PossapServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
