import {Component, Input} from '@angular/core';
import {NotificationFilterFormComponent} from './notification-filter-form/notification-filter-form.component';
import {NotificationListComponent} from './notification-list/notification-list.component';
import {NotificationSearchOutput} from '../../../../shared/utils/notification-search-output';
import {NotificationService} from '../../../../shared/services/notification.service';
import {AuthService} from '../../../../core/auth/services/auth.service';
import {ToastrService} from 'ngx-toastr';

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
  @Input() notifications: NotificationSearchOutput[] = [];

  constructor(private _notificationService: NotificationService, private _authService: AuthService, private _toastrService: ToastrService) {
  }

  applyFiltersNotifications($event: { category: string; isRead: string }) {
    const userId = this._authService.getId();
    const isRead = $event.isRead === 'read' ? true : $event.isRead === 'not-read' ? false : null;
    const category =
      $event.category === 'general' ? $event.category :
        $event.category === 'plans' ? $event.category :
          $event.category === 'programs' ? $event.category :
            null;

    this._notificationService.getFilteredNotifications(userId, isRead, category).subscribe({
      next: (notifications) => {
        this.notifications = notifications.notifications;
      },
      error: (error) => {
        this._toastrService.error('Error : ' + error.message);
      }
    });
  }
}
