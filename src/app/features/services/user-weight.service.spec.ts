import { TestBed } from '@angular/core/testing';

import { UserWeightService } from './user-weight.service';

describe('UserWeightService', () => {
  let service: UserWeightService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserWeightService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
