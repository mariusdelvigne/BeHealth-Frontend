import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StackedHorizontalBarGraphComponent } from './stacked-horizontal-bar-graph.component';

describe('StackedHorizontalBarGraphComponent', () => {
  let component: StackedHorizontalBarGraphComponent;
  let fixture: ComponentFixture<StackedHorizontalBarGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StackedHorizontalBarGraphComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StackedHorizontalBarGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
