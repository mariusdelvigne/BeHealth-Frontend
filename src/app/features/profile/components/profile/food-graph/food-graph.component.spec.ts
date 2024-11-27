import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodGraphComponent } from './food-graph.component';

describe('FoodGraphComponent', () => {
  let component: FoodGraphComponent;
  let fixture: ComponentFixture<FoodGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FoodGraphComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FoodGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
