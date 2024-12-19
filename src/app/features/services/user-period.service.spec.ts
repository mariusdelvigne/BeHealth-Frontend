import {TestBed} from '@angular/core/testing';

import {UserPeriodService} from './user-period.service';

describe('UserPeriodService', () => {
  let service: UserPeriodService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserPeriodService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
