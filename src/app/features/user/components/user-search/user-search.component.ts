import {Component, Input} from '@angular/core';
import {SearchFormComponent} from './search-form/search-form.component';
import {UserListComponent} from './user-list/user-list.component';
import {UserOutput} from '../../utils/user-output';
import {UserSearchService} from '../../services/user-search.service';
import {UserSearchQuery} from '../../utils/user-search-query';

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
  user: UserOutput = new class implements UserOutput {
    birthdate: string = "";
    gender: string = "";
    id: number = 0;
    mail: string = "";
    name: string = "";
    role: string = "";
    surname: string = "";
    username: string = "";
  };

  constructor(private _userSearchService: UserSearchService) {
  }

  searchUserByName(query: UserSearchQuery) {
    this._userSearchService.getUserByUsername(query).subscribe(users => {
      this.user = users;
    })
  }
}
