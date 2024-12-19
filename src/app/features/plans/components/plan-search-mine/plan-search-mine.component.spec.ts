import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PlanSearchMineComponent} from './plan-search-mine.component';

describe('PlanSearchMineComponent', () => {
  let component: PlanSearchMineComponent;
  let fixture: ComponentFixture<PlanSearchMineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanSearchMineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanSearchMineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
