import {Component, EventEmitter, Output} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {UserSearchQuery} from '../../../utils/user-search-query';

@Component({
  selector: 'app-search-form',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './search-form.component.html',
  styleUrl: './search-form.component.css'
})
export class SearchFormComponent {
  formSearch: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required])
  })
  @Output()
  userSearch: EventEmitter<UserSearchQuery> = new EventEmitter()

  searchUser() {
    console.log(this.formSearch.value.username);
    this.userSearch.emit({
        username: this.formSearch.value.username,
      }
    );
  }
}
