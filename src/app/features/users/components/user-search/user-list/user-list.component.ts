import {Component, Input} from '@angular/core';
import {UserSearchOutput} from '../../../../../shared/utils/user-search-output';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

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
}
