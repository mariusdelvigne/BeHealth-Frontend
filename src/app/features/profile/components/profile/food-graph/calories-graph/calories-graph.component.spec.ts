import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaloriesGraphComponent } from './calories-graph.component';

describe('CaloriesGraphComponent', () => {
  let component: CaloriesGraphComponent;
  let fixture: ComponentFixture<CaloriesGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaloriesGraphComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaloriesGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
