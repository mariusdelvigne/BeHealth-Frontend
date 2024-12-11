import {Component, OnInit} from '@angular/core';
import {NotificationsGetAllOutput} from '../../../utils/notifications-get-all-output';
import {AuthService} from '../../../../../core/auth/services/auth.service';
import {NotificationService} from '../../../../../shared/services/notification.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-view-all-notifications',
  standalone: true,
  imports: [],
  templateUrl: './view-all-notifications.component.html',
  styleUrl: './view-all-notifications.component.scss'
})
export class ViewAllNotificationsComponent implements OnInit {
  notifications: NotificationsGetAllOutput[] = [];

  constructor(private _authService: AuthService, private _notificationService: NotificationService, private _toastrService: ToastrService) {
  }

  ngOnInit() {
    this._notificationService.getAllNotifications().subscribe({
      next: (notifications) => {
        this.notifications = notifications.notifications;
      },
      error: (error) => {
        console.log(error);
        this._toastrService.error("Error : " + error.message);
      }
    })
  }
}
