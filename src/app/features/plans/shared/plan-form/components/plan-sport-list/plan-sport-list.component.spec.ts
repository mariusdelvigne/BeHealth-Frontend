import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanSportListComponent } from './plan-sport-list.component';

describe('PlanSportListComponent', () => {
  let component: PlanSportListComponent;
  let fixture: ComponentFixture<PlanSportListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanSportListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanSportListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
