import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PhysicalGraphComponent} from './physical-graph.component';

describe('PhysicalGraph', () => {
  let component: PhysicalGraphComponent;
  let fixture: ComponentFixture<PhysicalGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhysicalGraphComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhysicalGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
