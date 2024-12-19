import {ComponentFixture, TestBed} from '@angular/core/testing';

import {InsertFoodComponent} from './insert-food.component';

describe('InsertFoodComponent', () => {
  let component: InsertFoodComponent;
  let fixture: ComponentFixture<InsertFoodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InsertFoodComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsertFoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
