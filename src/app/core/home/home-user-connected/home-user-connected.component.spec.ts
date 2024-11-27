import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUserConnectedComponent } from './home-user-connected.component';

describe('HomeUserConnectedComponent', () => {
  let component: HomeUserConnectedComponent;
  let fixture: ComponentFixture<HomeUserConnectedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeUserConnectedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUserConnectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
