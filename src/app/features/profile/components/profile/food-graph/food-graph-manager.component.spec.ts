import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodGraphManagerComponent } from './food-graph-manager.component';

describe('FoodGraphComponent', () => {
  let component: FoodGraphManagerComponent;
  let fixture: ComponentFixture<FoodGraphManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FoodGraphManagerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FoodGraphManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
