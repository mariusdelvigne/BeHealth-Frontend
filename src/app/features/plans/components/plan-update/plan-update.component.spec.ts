import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PlanUpdateComponent} from './plan-update.component';

describe('PlanUpdateComponent', () => {
  let component: PlanUpdateComponent;
  let fixture: ComponentFixture<PlanUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
