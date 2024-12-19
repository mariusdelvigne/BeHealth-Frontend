import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UserBanModalDeleteChoiceComponent} from './user-ban-modal-delete-choice.component';

describe('UserBanModalDeleteChoiceComponent', () => {
  let component: UserBanModalDeleteChoiceComponent;
  let fixture: ComponentFixture<UserBanModalDeleteChoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserBanModalDeleteChoiceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserBanModalDeleteChoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
