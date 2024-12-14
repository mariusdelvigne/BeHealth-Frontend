import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanFoodListComponent } from './plan-food-list.component';

describe('PlanFoodListComponent', () => {
  let component: PlanFoodListComponent;
  let fixture: ComponentFixture<PlanFoodListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanFoodListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanFoodListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
