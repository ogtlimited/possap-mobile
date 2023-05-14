import { TestBed } from '@angular/core/testing';

import { ExtractApproversService } from './extract-approvers.service';

describe('ExtractApproversService', () => {
  let service: ExtractApproversService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExtractApproversService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
