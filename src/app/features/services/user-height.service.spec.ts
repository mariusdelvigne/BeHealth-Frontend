import {TestBed} from '@angular/core/testing';

import {UserHeightService} from './user-height.service';

describe('UserHeightService', () => {
  let service: UserHeightService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserHeightService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
