import {Component, Input} from '@angular/core';
import {SearchFormComponent} from './search-form/search-form.component';
import {UserListComponent} from './user-list/user-list.component';
import {UserSearchOutput} from '../../../../shared/utils/user-search-output';
import {UserSearchQuery} from '../../../../shared/utils/user-search-query';
import {UserService} from '../../../../shared/services/user.service';
import {UserBanCommand} from '../../../../shared/utils/user-ban-command';

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
  styleUrl: './user-search.component.css'
})
export class UserSearchComponent{
  @Input()
  user: UserSearchOutput[] = []

  private lastUserQuery: UserSearchQuery | null = null;

  constructor(private _userService: UserService) {
  }

  searchUserByName(query: UserSearchQuery) {
    this.lastUserQuery = query;
    this._userService.getUserByUsername(query).subscribe(users => {
      this.user = users.userGetByNames;
    });
  }

  banUser(command: UserBanCommand) {
    this._userService.banUser(command).subscribe(user => {
      console.log(user);
      if(this.lastUserQuery){
        this.searchUserByName(this.lastUserQuery);
      }
    })
  }
}
