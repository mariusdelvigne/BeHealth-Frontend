import {ComponentFixture, TestBed} from '@angular/core/testing';

import {InsertPeriodComponent} from './insert-period.component';

describe('InsertPeriodComponent', () => {
  let component: InsertPeriodComponent;
  let fixture: ComponentFixture<InsertPeriodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InsertPeriodComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsertPeriodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
