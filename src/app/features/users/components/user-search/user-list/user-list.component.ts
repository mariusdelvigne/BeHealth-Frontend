import {Component, EventEmitter, Input, Output} from '@angular/core';
import {UserSearchOutput} from '../../../../../shared/utils/user-search-output';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UserService} from '../../../../../shared/services/user.service';
import {UserBanCommand} from '../../../../../shared/utils/user-ban-command';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {
  @Input()
  users: UserSearchOutput[] = []

  @Output()
  userIsBanned: EventEmitter<UserBanCommand> = new EventEmitter()

  banUser(id: number) {
    this.userIsBanned.emit({
      userId: id,
      isBanned: true
    })
  }

  UnbanUser(id: number) {
    this.userIsBanned.emit({
      userId: id,
      isBanned: false
    })
  }
}
