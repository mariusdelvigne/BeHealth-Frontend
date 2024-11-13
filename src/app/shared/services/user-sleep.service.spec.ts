import { TestBed } from '@angular/core/testing';

import { UserSleepService } from './user-sleep.service';

describe('UserSleepService', () => {
  let service: UserSleepService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserSleepService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
