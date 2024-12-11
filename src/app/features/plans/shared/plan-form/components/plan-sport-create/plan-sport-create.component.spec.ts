import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanSportCreateComponent } from './plan-sport-create.component';

describe('PlanSportCreateComponent', () => {
  let component: PlanSportCreateComponent;
  let fixture: ComponentFixture<PlanSportCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanSportCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanSportCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
