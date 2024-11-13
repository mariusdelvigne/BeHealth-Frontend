import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertSleepComponent } from './insert-sleep.component';

describe('InsertSleepComponent', () => {
  let component: InsertSleepComponent;
  let fixture: ComponentFixture<InsertSleepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InsertSleepComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsertSleepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
