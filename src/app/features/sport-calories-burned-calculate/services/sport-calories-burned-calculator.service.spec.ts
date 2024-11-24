import { TestBed } from '@angular/core/testing';

import { SportCaloriesBurnedCalculatorService } from './sport-calories-burned-calculator.service';

describe('SportCaloriesBurnedCalculatorService', () => {
  let service: SportCaloriesBurnedCalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SportCaloriesBurnedCalculatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
