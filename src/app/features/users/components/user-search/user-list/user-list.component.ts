import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {UserSearchOutput} from '../../../../utils/user-search-output';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UserBanCommand} from '../../../utils/user-ban-command';
import {UserService} from '../../../../../shared/services/user.service';
import {ToastrService} from 'ngx-toastr';
import {UserBanComponent} from './user-ban/user-ban.component';
import {UserEventBusService} from '../../../utils/user-event-bus.service';
import {Subscription} from 'rxjs';
import {UserBanDeleteChoice} from '../../../utils/user-ban-delete-choice';
import {AuthService} from '../../../../../core/auth/services/auth.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    UserBanComponent,
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit, OnDestroy {
  @Input() users: UserSearchOutput[] = [];
  private _userBanStatusSubscription: Subscription | null = null;

  @Output()
  userIsBanned: EventEmitter<UserBanCommand> = new EventEmitter()

  constructor(private _userService: UserService, private _toastrService: ToastrService, private _userBanEventBus: UserEventBusService, private _authService: AuthService) {
  }

  ngOnInit() {
    this._userBanStatusSubscription = this._userBanEventBus.listen('UserBanStatusChanged').subscribe(event => {
      const {userId, isBanned} = event.object;
      const user = this.users.find(u => u.id === userId);
      if (user) {
        user.isBanned = isBanned;
      }
    });
  }

  ngOnDestroy() {
    if (this._userBanStatusSubscription) {
      this._userBanStatusSubscription.unsubscribe();
    }
  }

  getRoleIsAdmin(): boolean {
    return this._authService.isAdmin();
  }

  onUserBanStatusChange(userId: number, isBanned: boolean) {
    const command: UserBanCommand = {userId, isBanned};
    const user = this.users.find(u => u.id === userId);

    this._userService.banUser(command).subscribe({
        next: () => {
          this._toastrService.success(`User : ${user?.username} has been ${isBanned ? 'banned' : 'unbanned'}`)
        },
        error: (error) => {
          this._toastrService.error("Error banning user");
        }
      }
    );

    if (user) {
      user.isBanned = isBanned;
    }
  }

  deleteAllPlansOfUser(userId: number, deleted: boolean) {
    const user = this.users.find(u => u.id === userId);
    const command: UserBanDeleteChoice = {userId};

    this._userService.deleteAllPlanByUserId(userId).subscribe({
        next: () => {
          this._toastrService.success(`All plans of ${user?.username} are deleted successfully`)
        },
        error: (error) => {
          this._toastrService.error(`Unable to delete plan of ${user?.username}`);
        }
      }
    )
  }

  deleteAllProgramsOfUser(userId: number, deleted: boolean) {
    const user = this.users.find(u => u.id === userId);
    const command: UserBanDeleteChoice = {userId};

    this._userService.deleteAllProgramsByUserId(userId).subscribe({
      next: () => {
        this._toastrService.success(`All programs of ${user?.username} are deleted successfully`)
      },
      error: (error) => {
        this._toastrService.error(`Unable to delete programs of ${user?.username}`);
      }
    })
  }

  deleteAllFeedbacksOfUser(userId: number, deleted: boolean) {
    const user = this.users.find(u => u.id === userId);
    const command: UserBanDeleteChoice = {userId};

    this._userService.deleteAllFeedbackByUserId(userId).subscribe({
      next: () => {
        this._toastrService.success(`All feedbacks of ${user?.username} are deleted successfully`)
      },
      error: (error) => {
        this._toastrService.error(`Unable to delete feedbacks of ${user?.username}`);
      }
    })
  }
}
