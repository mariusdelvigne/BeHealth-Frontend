import {Component, EventEmitter, Output} from '@angular/core';
import {MdbDropdownModule} from 'mdb-angular-ui-kit/dropdown';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {DebounceService} from '../../../../../shared/utils/debounce.service';

@Component({
  selector: 'app-notification-filter-form',
  standalone: true,
  imports: [
    MdbDropdownModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './notification-filter-form.component.html',
  styleUrls: ['./notification-filter-form.component.css']
})
export class NotificationFilterFormComponent {
  @Output() filtersNotification: EventEmitter<{ category: string, isRead: string }> = new EventEmitter();

  formSearch: FormGroup = new FormGroup({
    category: new FormControl('All categories', [Validators.required]),
    isRead: new FormControl('all', [Validators.required])
  });

  allCategories: { name: string; value: string }[] = [
    {name: "All", value: "All categories"},
    {name: "General", value: "general"},
    {name: "Plans", value: "plans"},
    {name: "Programs", value: "programs"}
  ];

  constructor(private _debounceService: DebounceService) {
  }

  get debouncedFilterNotifications(): () => void {
    return this._debounceService.debounce(() => {
      const selectedCategory = this.formSearch.get('category')?.value || "all";
      const selectedRead = this.formSearch.get('isRead')?.value || "all";

      this.filtersNotification.emit({category: selectedCategory, isRead: selectedRead});
    }, 200);
  }
}
