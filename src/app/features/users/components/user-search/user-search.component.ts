import {Component, Input} from '@angular/core';
import {SearchFormComponent} from './search-form/search-form.component';
import {UserListComponent} from './user-list/user-list.component';
import {UserSearchOutput} from '../../../../shared/utils/user-search-output';
import {UserSearchService} from '../../../../shared/services/user-search.service';
import {UserSearchQuery} from '../../../../shared/utils/user-search-query';

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

  constructor(private _userSearchService: UserSearchService) {
  }

  searchUserByName(query: UserSearchQuery) {
    this._userSearchService.getUserByUsername(query).subscribe(users => {
      console.log(users.userGetByNames.birthDate);
      this.user = users.userGetByNames;
    })
  }
}
