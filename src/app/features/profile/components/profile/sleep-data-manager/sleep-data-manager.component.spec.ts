import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SleepDataManagerComponent} from './sleep-data-manager.component';

describe('SleepDataManagerComponent', () => {
  let component: SleepDataManagerComponent;
  let fixture: ComponentFixture<SleepDataManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SleepDataManagerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SleepDataManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
