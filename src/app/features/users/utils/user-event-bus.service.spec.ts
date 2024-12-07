import { TestBed } from '@angular/core/testing';

import { UserEventBusService } from './user-event-bus.service';

describe('UserEventBusService', () => {
  let service: UserEventBusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserEventBusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
