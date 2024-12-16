import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SportDataManagerComponent } from './sport-data-manager.component';

describe('SportDataManagerComponent', () => {
  let component: SportDataManagerComponent;
  let fixture: ComponentFixture<SportDataManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SportDataManagerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SportDataManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
