import { TestBed } from '@angular/core/testing';

import { UserFoodService } from './user-food.service';

describe('UserFoodService', () => {
  let service: UserFoodService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserFoodService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
