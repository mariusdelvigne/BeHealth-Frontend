import {Component, EventEmitter, Input, Output} from '@angular/core';
import {UserService} from '../../../../../../shared/services/user.service';

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

  userBan(userIsBanned: boolean) {
    this.userIsBanned = !this.userIsBanned;
    this.userIsBannedChange.emit(this.userIsBanned);
  }
}
