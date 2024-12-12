import {Component, OnInit} from '@angular/core';
import {NotificationService} from '../../../../../shared/services/notification.service';
import {ToastrService} from 'ngx-toastr';
import {UserService} from '../../../../../shared/services/user.service';
import {NotificationsGetAllOutput} from '../../../../notifications/utils/notifications-get-all-output';

@Component({
  selector: 'app-view-all-notifications',
  standalone: true,
  imports: [],
  templateUrl: './view-all-notifications.component.html',
  styleUrls: ['./view-all-notifications.component.scss']
})
export class ViewAllNotificationsComponent implements OnInit {
  notifications: NotificationsGetAllOutput[] = [];

  constructor(private _notificationService: NotificationService, private _toastrService: ToastrService, private _userService: UserService) {
  }

  ngOnInit() {
    this._notificationService.getAllNotifications().subscribe({
      next: (notifications) => {
        this.notifications = notifications.notifications;

        this.notifications.forEach((notification, index) => {
          this.getUserReceiver(notification, index);
        });
      },
      error: (error) => {
        this._toastrService.error("Error : " + error.message);
      }
    });
  }

  getUserReceiver(notification: NotificationsGetAllOutput, index: number) {
    const userId = notification.userId;
    this._userService.getById(userId).subscribe({
      next: (user) => {
        this.notifications[index].userName = user.username;
      },
      error: (error) => {
        this._toastrService.error("Error : " + error.message);
      }
    });
  }

  getDateTime(sendingDateTime: string): string {
    const date = new Date(sendingDateTime);

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}`;
  }

  deleteNotification(id: number) {
    this._notificationService.deleteNotification(id).subscribe();
    window.location.reload();
  }
}
