import { Component } from '@angular/core';
import {MdbDropdownModule} from 'mdb-angular-ui-kit/dropdown';
import {ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-notification-filter-form',
  standalone: true,
  imports: [
    MdbDropdownModule,
    ReactiveFormsModule
  ],
  templateUrl: './notification-filter-form.component.html',
  styleUrl: './notification-filter-form.component.css'
})
export class NotificationFilterFormComponent {
  allCategories: string[] = [
    "All categories", "General", "Plans", "Programs"
  ];

  filterNotifications(category: string) {
    console.log('Filtered by category:', category);
  }
}
