import { TestBed } from '@angular/core/testing';

import { UserSportService } from './user-sport.service';

describe('UserSportService', () => {
  let service: UserSportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserSportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
