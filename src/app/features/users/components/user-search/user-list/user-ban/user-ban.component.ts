import {Component, EventEmitter, Input, Output} from '@angular/core';
import {UserEventBusService} from '../../../../utils/user-event-bus.service';
import {UserBanCustomEvent} from '../../../../utils/user-ban-custom-event';
import {MdbModalModule, MdbModalRef, MdbModalService} from 'mdb-angular-ui-kit/modal';
import {UserBanModalDeleteChoiceComponent} from './user-ban-modal-delete-choice/user-ban-modal-delete-choice.component';

@Component({
  selector: 'app-user-ban',
  standalone: true,
  imports: [MdbModalModule],
  templateUrl: './user-ban.component.html',
  styleUrl: './user-ban.component.css'
})
export class UserBanComponent {
  @Input() userIsBanned: boolean = false;
  @Input() userDeletePrograms: boolean = false;
  @Input() userDeletePlans: boolean = false;
  @Input() userDeleteFeedbacks: boolean = false;

  @Output() userIsBannedChange = new EventEmitter<boolean>();
  @Output() deleteUserPrograms = new EventEmitter<boolean>();
  @Output() deleteUserPlans = new EventEmitter<boolean>();
  @Output() deleteUserFeedbacks = new EventEmitter<boolean>();

  modalRef: MdbModalRef<UserBanModalDeleteChoiceComponent> | null = null;

  constructor(private _userBanEventBus: UserEventBusService, private _modalService: MdbModalService) {}

  userBan() {
    this.userIsBanned = !this.userIsBanned;
    this.userIsBannedChange.emit(this.userIsBanned);

    const event: UserBanCustomEvent = {
      name: 'UserBanStatusChanged',
      object: { isBanned: this.userIsBanned }
    };
    this._userBanEventBus.publish(event);

    if (this.userIsBanned) {
      this.modalRef = this._modalService.open(UserBanModalDeleteChoiceComponent);

      this.modalRef.component.deleteUserPlans.subscribe((deletePlans: boolean) => {
        this.deleteUserPlans.emit(deletePlans);
      });

      this.modalRef.component.deleteUserPrograms.subscribe((deletePrograms: boolean) => {
        this.deleteUserPrograms.emit(deletePrograms);
      });

      this.modalRef.component.deleteUserFeedbacks.subscribe((deleteFeedbacks: boolean) => {
        this.deleteUserFeedbacks.emit(deleteFeedbacks);
      });
    }
  }
}
