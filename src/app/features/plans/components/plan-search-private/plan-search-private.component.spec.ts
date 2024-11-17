import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanSearchPrivateComponent } from './plan-search-private.component';

describe('PlanSearchMineComponent', () => {
  let component: PlanSearchPrivateComponent;
  let fixture: ComponentFixture<PlanSearchPrivateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanSearchPrivateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanSearchPrivateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
