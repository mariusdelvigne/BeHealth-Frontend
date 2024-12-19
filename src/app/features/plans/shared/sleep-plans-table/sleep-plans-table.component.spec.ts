import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SleepPlansTableComponent} from './sleep-plans-table.component';

describe('SleepPlansTableComponent', () => {
  let component: SleepPlansTableComponent;
  let fixture: ComponentFixture<SleepPlansTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SleepPlansTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SleepPlansTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
