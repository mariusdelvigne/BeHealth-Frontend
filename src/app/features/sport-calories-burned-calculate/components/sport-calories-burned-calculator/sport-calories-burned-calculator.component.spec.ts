import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SportCaloriesBurnedCalculatorComponent} from './sport-calories-burned-calculator.component';

describe('SportCaloriesBurnedCalculatorComponent', () => {
  let component: SportCaloriesBurnedCalculatorComponent;
  let fixture: ComponentFixture<SportCaloriesBurnedCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SportCaloriesBurnedCalculatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SportCaloriesBurnedCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
