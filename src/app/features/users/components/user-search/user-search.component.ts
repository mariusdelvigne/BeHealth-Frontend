import {Component, Input} from '@angular/core';
import {SearchFormComponent} from './search-form/search-form.component';
import {UserListComponent} from './user-list/user-list.component';
import {UserSearchOutput} from '../../../../shared/utils/user-search-output';
import {UserSearchQuery} from '../../../../shared/utils/user-search-query';
import {UserService} from '../../../../shared/services/user.service';

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

  constructor(private _userService: UserService) {
  }

  searchUserByName(query: UserSearchQuery) {
    this._userService.getUserByUsername(query).subscribe(users => {
      console.log(users.userGetByNames.birthDate);
      this.user = users.userGetByNames;
    });
  }
}
