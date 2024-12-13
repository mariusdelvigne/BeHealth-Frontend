import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanFoodCreateComponent } from './plan-food-create.component';

describe('PlanFoodCreateComponent', () => {
  let component: PlanFoodCreateComponent;
  let fixture: ComponentFixture<PlanFoodCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanFoodCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanFoodCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
