import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertSportComponent } from './insert-sport.component';

describe('InsertSportComponent', () => {
  let component: InsertSportComponent;
  let fixture: ComponentFixture<InsertSportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InsertSportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsertSportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
