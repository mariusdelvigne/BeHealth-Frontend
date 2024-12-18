import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanSleepFormComponent } from './plan-sleep-form.component';

describe('PlanSleepFormComponent', () => {
  let component: PlanSleepFormComponent;
  let fixture: ComponentFixture<PlanSleepFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanSleepFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanSleepFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
