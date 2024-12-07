import {Component, OnInit} from '@angular/core';
import { NotificationService } from '../../../services/notification.service';
import {AuthService} from '../../../../../core/auth/services/auth.service';
import {NotificationSearchOutput} from '../../../utils/notification-search-output';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-notification-list',
  standalone: true,
  imports: [],
  templateUrl: './notification-list.component.html',
  styleUrl: './notification-list.component.css'
})
export class NotificationListComponent implements OnInit {
  notifications: NotificationSearchOutput[] = [];

  constructor(private _notificationService: NotificationService, private _authService: AuthService, private _toastrService: ToastrService) {}

  ngOnInit() {
    console.log(this._authService.getId())
    this._notificationService.getNotificationByUserId(this._authService.getId()).subscribe({
      next: (notifications) => {
        this.notifications = notifications.notifications;
      },
      error: (error) => {
        console.log(error);
        this._toastrService.error("Error : "+ error.message);
      }
    })
  }
}
