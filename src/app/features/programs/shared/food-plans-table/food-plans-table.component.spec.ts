import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodPlansTableComponent } from './food-plans-table.component';

describe('FoodTableComponent', () => {
  let component: FoodPlansTableComponent;
  let fixture: ComponentFixture<FoodPlansTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FoodPlansTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FoodPlansTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
