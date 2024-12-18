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
  pageNumber = 1;

  constructor(private _debounceService: DebounceService) {
  }

  get debouncedSearchUser(): () => void {
    return this._debounceService.debounce(() => {
      this.userSearch.emit({username: this.search, pageNumber: this.pageNumber - 1, pageSize: 10});
    }, 200);
  }

  previousPage() {
    this.pageNumber--;
    this.debouncedSearchUser();
  }

  nextPage() {
    this.pageNumber++;
    this.debouncedSearchUser();
  }
}
