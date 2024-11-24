import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanInfoComponent } from './plan-info.component';

describe('PlanInfoComponent', () => {
  let component: PlanInfoComponent;
  let fixture: ComponentFixture<PlanInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
