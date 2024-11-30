import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SportPlansTableComponent } from './sport-plans-table.component';

describe('SportPlansTableComponent', () => {
  let component: SportPlansTableComponent;
  let fixture: ComponentFixture<SportPlansTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SportPlansTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SportPlansTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
