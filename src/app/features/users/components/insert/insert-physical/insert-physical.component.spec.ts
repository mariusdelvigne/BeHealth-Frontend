import {ComponentFixture, TestBed} from '@angular/core/testing';

import {InsertPhysicalComponent} from './insert-physical.component';

describe('InsertPhysicalComponent', () => {
  let component: InsertPhysicalComponent;
  let fixture: ComponentFixture<InsertPhysicalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InsertPhysicalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsertPhysicalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
