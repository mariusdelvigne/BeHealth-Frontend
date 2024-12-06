import {Component, EventEmitter, Input, Output, TemplateRef} from '@angular/core';
import {UserSearchOutput} from '../../../../../shared/utils/user-search-output';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UserBanCommand} from '../../../../../shared/utils/user-ban-command';
import {UserService} from '../../../../../shared/services/user.service';
import {DatePipe} from '@angular/common';
import {ToastrService} from 'ngx-toastr';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    DatePipe,
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {
  @Input()
  users: UserSearchOutput[] = []

  @Output()
  userIsBanned: EventEmitter<UserBanCommand> = new EventEmitter()

  constructor(private _userService: UserService, private _toastrService: ToastrService, public modalRef: MdbModalRef<UserListComponent>) {
  }

  banUser(id: number) {

    this.userIsBanned.emit({
      userId: id,
      isBanned: true
    })
  }

  // banUser(id: number) {
  //   this.userIsBanned.emit({
  //     userId: id,
  //     isBanned: true
  //   })
  //
  // }

  unbanUser(id: number) {
    this.userIsBanned.emit({
      userId: id,
      isBanned: false
    })
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
