import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCommunicationsComponent } from './view-communications.component';

describe('ViewCommunicationsComponent', () => {
  let component: ViewCommunicationsComponent;
  let fixture: ComponentFixture<ViewCommunicationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewCommunicationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewCommunicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
