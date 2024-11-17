import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanSearchPublicComponent } from './plan-search-public.component';

describe('PlanSearchComponent', () => {
  let component: PlanSearchPublicComponent;
  let fixture: ComponentFixture<PlanSearchPublicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanSearchPublicComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanSearchPublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
