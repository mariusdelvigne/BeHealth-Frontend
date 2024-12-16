import {Component, EventEmitter, Output} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UserSearchQuery} from '../../../../../shared/utils/user-search-query';
import {DebounceService} from '../../../../../shared/services/debounce.service';

@Component({
  selector: 'app-search-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './search-form.component.html',
  styleUrl: './search-form.component.scss'
})
export class SearchFormComponent {
  @Output() userSearch: EventEmitter<UserSearchQuery> = new EventEmitter()

  search: string = "";

  constructor(private _debounceService: DebounceService) { }

  get debouncedSearchUser(): () => void {
    return this._debounceService.debounce(() => {
      this.userSearch.emit({ username: this.search });
    }, 500);
  }
}
