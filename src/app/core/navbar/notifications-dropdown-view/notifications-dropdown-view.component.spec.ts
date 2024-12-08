import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationsDropdownViewComponent } from './notifications-dropdown-view.component';

describe('NotificationsDropdownViewComponent', () => {
  let component: NotificationsDropdownViewComponent;
  let fixture: ComponentFixture<NotificationsDropdownViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificationsDropdownViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotificationsDropdownViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
