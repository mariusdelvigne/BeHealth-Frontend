import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmiGraphComponent } from './bmi-graph.component';

describe('BmiGraphComponent', () => {
  let component: BmiGraphComponent;
  let fixture: ComponentFixture<BmiGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BmiGraphComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BmiGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
