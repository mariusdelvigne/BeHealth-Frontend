import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodGraphManagerComponent } from './period-graph-manager.component';

describe('PeriodGraphComponent', () => {
  let component: PeriodGraphManagerComponent;
  let fixture: ComponentFixture<PeriodGraphManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PeriodGraphManagerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PeriodGraphManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
