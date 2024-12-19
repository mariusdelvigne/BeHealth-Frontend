import {ComponentFixture, TestBed} from '@angular/core/testing';

import {StackedBarGraphComponent} from './stacked-bar-graph.component';

describe('StackedBarGraphComponent', () => {
  let component: StackedBarGraphComponent;
  let fixture: ComponentFixture<StackedBarGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StackedBarGraphComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StackedBarGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
