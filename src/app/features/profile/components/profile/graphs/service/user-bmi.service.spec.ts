import {TestBed} from '@angular/core/testing';

import {UserBmiService} from './user-bmi.service';

describe('UserBmiService', () => {
  let service: UserBmiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserBmiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
