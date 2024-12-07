import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationFilterFormComponent } from './notification-filter-form.component';

describe('NotificationFilterFormComponent', () => {
  let component: NotificationFilterFormComponent;
  let fixture: ComponentFixture<NotificationFilterFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificationFilterFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotificationFilterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
