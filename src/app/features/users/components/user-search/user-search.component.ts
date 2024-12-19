import {Component, Input, OnInit} from '@angular/core';
import {SearchFormComponent} from './search-form/search-form.component';
import {UserListComponent} from './user-list/user-list.component';
import {UserSearchOutput} from '../../../utils/user-search-output';
import {UserSearchQuery} from '../../../utils/user-search-query';
import {UserService} from '../../../../shared/services/user.service';
import {UserBanCommand} from '../../utils/user-ban-command';
import {UserBanDeleteChoice} from '../../utils/user-ban-delete-choice';

@Component({
  selector: 'app-user-search',
  standalone: true,
  imports: [
    SearchFormComponent,
    UserListComponent
  ],
  providers: [
  ],
  templateUrl: './user-search.component.html',
  styleUrl: './user-search.component.scss'
})
export class UserSearchComponent implements OnInit {
  @Input()
  user: UserSearchOutput[] = []

  userSearch: UserSearchQuery = {
    pageSize:10, pageNumber:0, username:""
  };

  constructor(private _userService: UserService) {
  }

  ngOnInit() {
    this.searchUserByName(this.userSearch);
  }

  searchUserByName(query: UserSearchQuery) {
    this._userService.getUserByUsername(query).subscribe(users => {
      this.user = users.userGetByNames;
    });
  }

  banUser(command: UserBanCommand) {
    this._userService.banUser(command).subscribe()
  }

  deleteAllProgramsOfUSer(command: UserBanDeleteChoice) {
    this._userService.deleteAllProgramsByUserId(command.userId);
  }

  deleteAllPlansOfUser(command: UserBanDeleteChoice) {
    this._userService.deleteAllPlanByUserId(command.userId);
  }

  deleteAllFeedbacks(command: UserBanDeleteChoice) {
    this._userService.deleteAllFeedbackByUserId(command.userId);
  }
}
