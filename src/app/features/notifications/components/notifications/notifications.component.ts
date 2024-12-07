import { Component } from '@angular/core';
import {NotificationFilterFormComponent} from './notification-filter-form/notification-filter-form.component';
import {NotificationListComponent} from './notification-list/notification-list.component';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [
    NotificationFilterFormComponent,
    NotificationListComponent
  ],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css'
})
export class NotificationsComponent {

}
