import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodDataManagerComponent } from './food-data-manager.component';

describe('FoodGraphComponent', () => {
  let component: FoodDataManagerComponent;
  let fixture: ComponentFixture<FoodDataManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FoodDataManagerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FoodDataManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
