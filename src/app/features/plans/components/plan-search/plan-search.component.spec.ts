import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanSearchComponent } from './plan-search.component';

describe('PlanSearchComponent', () => {
  let component: PlanSearchComponent;
  let fixture: ComponentFixture<PlanSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanSearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
