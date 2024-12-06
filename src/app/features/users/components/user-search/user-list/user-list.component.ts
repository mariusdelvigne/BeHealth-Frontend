import {Component, EventEmitter, Input, Output} from '@angular/core';
import {UserSearchOutput} from '../../../../../shared/utils/user-search-output';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UserBanCommand} from '../../../../../shared/utils/user-ban-command';
import {UserService} from '../../../../../shared/services/user.service';
import {DatePipe} from '@angular/common';
import {ToastrService} from 'ngx-toastr';
import {UserBanComponent} from './user-ban/user-ban.component';
import {UserEventBusService} from '../../../utils/user-event-bus.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    DatePipe,
    UserBanComponent,
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {
  @Input()
  users: UserSearchOutput[] = []

  @Output()
  userIsBanned: EventEmitter<UserBanCommand> = new EventEmitter()

  constructor(private _userService: UserService, private _toastrService: ToastrService, private _userBanEventBus: UserEventBusService) {
  }

  onUserBanStatusChange(userId: number, isBanned: boolean) {
    const command:UserBanCommand = { userId, isBanned };
    this.userIsBanned.emit(command);
    const user = this.users.find(u => u.id === userId);
    if (user) {
      user.isBanned = isBanned;
    }
  }

  deleteAllPlansOfUser(id: number) {
    this._userService.deleteAllPlanByUserId(id).subscribe({
        next: (response) => {
          this._toastrService.success("All plans of the user are deleted successfully")
        },
        error: (error) => {
          this._toastrService.error("Unable to delete plan of user list" + error.message);
        }
      }
    )
  }

  deleteAllProgramsOfUser(id: number) {
    this._userService.deleteAllProgramsByUserId(id).subscribe({
      next: (response) => {
        this._toastrService.success("All programs of the user are deleted successfully")
      },
      error: (error) => {
        this._toastrService.error("Unable to delete program of user list" + error.message);
      }
    })
  }

  deleteAllFeedbacksOfUser(id: number) {
    this._userService.deleteAllFeedbackByUserId(id).subscribe({
      next: (response) => {
        this._toastrService.success("All feedbacks of the user are deleted successfully")
      },
      error: (error) => {
        this._toastrService.error("Unable to delete feedback of user list" + error.message);
      }
    })
  }
}
