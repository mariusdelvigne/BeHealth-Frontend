import {Component, EventEmitter, Output} from '@angular/core';
import {MdbDropdownModule} from 'mdb-angular-ui-kit/dropdown';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NotificationGetByCategoryCommand} from '../../../utils/notification-get-by-category-command';

@Component({
  selector: 'app-notification-filter-form',
  standalone: true,
  imports: [
    MdbDropdownModule,
    ReactiveFormsModule
  ],
  templateUrl: './notification-filter-form.component.html',
  styleUrls: ['./notification-filter-form.component.css']
})
export class NotificationFilterFormComponent {
  @Output() selectedCategory: EventEmitter<NotificationGetByCategoryCommand> = new EventEmitter();
  @Output() selectedRead: EventEmitter<string> = new EventEmitter();

  formSearch: FormGroup = new FormGroup({
    category: new FormControl('', [Validators.required]),
    isRead: new FormControl('', [Validators.required]) // Corrected name here
  });

  allCategories: string[] = [
    "All categories", "general", "plans", "programs"
  ];

  filterNotifications() {
    const selectedCategory = this.formSearch.get('category')?.value;
    const selectedRead = this.formSearch.get('isRead')?.value;

    console.log('Filtered by category:', selectedCategory, 'and read:', selectedRead);

    if (selectedCategory) {
      this.selectedCategory.emit(selectedCategory);
    }
    if (selectedRead) {
      this.selectedRead.emit(selectedRead);
    }
  }
}
