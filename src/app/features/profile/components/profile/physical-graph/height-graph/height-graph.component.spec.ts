import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeightGraphComponent } from './height-graph.component';

describe('HeightGraphComponent', () => {
  let component: HeightGraphComponent;
  let fixture: ComponentFixture<HeightGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeightGraphComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeightGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
