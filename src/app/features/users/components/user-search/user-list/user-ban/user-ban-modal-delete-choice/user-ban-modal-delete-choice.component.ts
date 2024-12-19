import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {MdbModalRef} from 'mdb-angular-ui-kit/modal';
import {UserBanCustomEvent} from '../../../../../utils/user-ban-custom-event';
import {UserEventBusService} from '../../../../../utils/user-event-bus.service';

@Component({
  selector: 'app-user-ban-modal-delete-choice',
  standalone: true,
  imports: [],
  templateUrl: './user-ban-modal-delete-choice.component.html',
  styleUrl: './user-ban-modal-delete-choice.component.scss'
})
export class UserBanModalDeleteChoiceComponent {
  @Input() userDeletePlans: boolean = true;
  @Input() userDeletePrograms: boolean = true;
  @Input() userDeleteFeedbacks: boolean = true;

  @Output() deleteUserPlans = new EventEmitter<boolean>();
  @Output() deleteUserPrograms = new EventEmitter<boolean>();
  @Output() deleteUserFeedbacks = new EventEmitter<boolean>();

  private _userBanEventBus: UserEventBusService = inject(UserEventBusService);

  constructor(public modalRef: MdbModalRef<UserBanModalDeleteChoiceComponent>) { }

  deleteUserPlan() {
    this.deleteUserPlans.emit(this.userDeletePlans);
    const eventDeleted: UserBanCustomEvent = {
      name: 'deleteAllPlansOfUser',
      object: {deletePlans: this.userDeletePlans},
    };
    this._userBanEventBus.publish(eventDeleted);
  }

  deleteUserProgram() {
    this.deleteUserPrograms.emit(this.userDeletePrograms);
    const eventDeleted: UserBanCustomEvent = {
      name: 'deleteAllProgramsOfUSer',
      object: {deletePrograms: this.userDeletePrograms},
    };
    this._userBanEventBus.publish(eventDeleted);
  }

  deleteUserFeedback() {
    this.deleteUserFeedbacks.emit(this.userDeleteFeedbacks);
    const eventDeleted: UserBanCustomEvent = {
      name: 'deleteAllFeedbacks',
      object: {deleteFeedbacks: this.userDeleteFeedbacks},
    };
    this._userBanEventBus.publish(eventDeleted);
  }

  deleteUserAll() {
    this.deleteUserPlan();
    this.deleteUserProgram();
    this.deleteUserFeedback();
  }
}
