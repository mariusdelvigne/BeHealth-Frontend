import {Component, EventEmitter, Input, Output} from '@angular/core';
import {UserService} from '../../../../../../shared/services/user.service';
import {UserEventBusService} from '../../../../utils/user-event-bus.service';
import {UserBanCustomEvent} from '../../../../utils/user-ban-custom-event';

@Component({
  selector: 'app-user-ban',
  standalone: true,
  imports: [],
  templateUrl: './user-ban.component.html',
  styleUrl: './user-ban.component.css'
})
export class UserBanComponent {
  @Input()
  userIsBanned: boolean = false;

  @Output()
  userIsBannedChange = new EventEmitter<boolean>();

  constructor(private _userBanEventBus: UserEventBusService) {}

  userBan() {
    this.userIsBanned = !this.userIsBanned;
    this.userIsBannedChange.emit(this.userIsBanned);

    const event: UserBanCustomEvent = {
      name: 'UserBanStatusChanged',
      object: { isBanned: this.userIsBanned }
    };
    this._userBanEventBus.publish(event);
  }
}
