import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanSleepElementComponent } from './plan-sleep-element.component';

describe('PlanSleepElementComponent', () => {
  let component: PlanSleepElementComponent;
  let fixture: ComponentFixture<PlanSleepElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanSleepElementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanSleepElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
