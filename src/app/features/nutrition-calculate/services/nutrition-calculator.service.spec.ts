import {TestBed} from '@angular/core/testing';

import {NutritionCalculatorService} from './nutrition-calculator.service';

describe('NutritionCalculatorService', () => {
  let service: NutritionCalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NutritionCalculatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
