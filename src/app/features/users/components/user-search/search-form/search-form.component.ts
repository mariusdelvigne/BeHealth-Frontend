import {Component, EventEmitter, Output} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {UserSearchQuery} from '../../../../../shared/utils/user-search-query';

@Component({
  selector: 'app-search-form',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './search-form.component.html',
  styleUrl: './search-form.component.scss'
})
export class SearchFormComponent {

  onButtonClick(event: Event) {
    const button = event.target as HTMLButtonElement;
    button.classList.add('btn-clicked');
    setTimeout(() => button.classList.remove('btn-clicked'), 300);
  }

  formSearch: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required])
  })
  @Output()
  userSearch: EventEmitter<UserSearchQuery> = new EventEmitter()

  searchUser() {
    this.userSearch.emit({
        username: this.formSearch.value.username,
      }
    );
  }
}
