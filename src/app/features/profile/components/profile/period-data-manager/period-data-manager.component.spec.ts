import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PeriodDataManagerComponent} from './period-data-manager.component';

describe('PeriodGraphComponent', () => {
  let component: PeriodDataManagerComponent;
  let fixture: ComponentFixture<PeriodDataManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PeriodDataManagerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PeriodDataManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
