import {Component, Input, OnInit} from '@angular/core';
import {NotificationService} from '../../../../../shared/services/notification.service';
import {AuthService} from '../../../../../core/auth/services/auth.service';
import {NotificationSearchOutput} from '../../../../../shared/utils/notification-search-output';
import {ToastrService} from 'ngx-toastr';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-notification-list',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './notification-list.component.html',
  styleUrl: './notification-list.component.css'
})
export class NotificationListComponent implements OnInit {
  @Input() notifications: NotificationSearchOutput[] = [];
  pageNumber = 1;

  constructor(private _notificationService: NotificationService, private _authService: AuthService, private _toastrService: ToastrService) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this._notificationService.getNotificationByUserId(this._authService.getId()).subscribe({
      next: (notifications) => {
        this.notifications = notifications.notifications;
      },
      error: (error) => {
        this._toastrService.error("Error : "+ error.message);
      }
    })
  }
}
