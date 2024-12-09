import {Component, OnInit} from '@angular/core';
import {NotificationSearchOutput} from '../../../../../../shared/utils/notification-search-output';
import {NotificationService} from '../../../../../../shared/services/notification.service';
import {AuthService} from '../../../../../../core/auth/services/auth.service';
import {ActivatedRoute} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-notification-read',
  standalone: true,
  imports: [],
  templateUrl: './notification-read.component.html',
  styleUrl: './notification-read.component.css'
})
export class NotificationReadComponent implements OnInit {
  notificationToPrint: NotificationSearchOutput = {
    id: 0,
    category: "",
    title: "",
    seen: false,
    description: "",
    sendingDateTime: new Date().toISOString(),
  };
  notificationId: number = 0;

  constructor(private _route: ActivatedRoute, private _notificationService: NotificationService, private _authService: AuthService, private _toastrService: ToastrService) {
  }

  ngOnInit() {
    const userId = this._authService.getId();
    this._route.params.subscribe(params => {
      this.notificationId = params['id'];
      if (this.notificationId) {
        this._notificationService.getNotificationByNotificationId(userId, this.notificationId).subscribe({
          next: (notifications) => {
            this.notificationToPrint = notifications;
          },
          error: (error) => {
            this._toastrService.error("Error : " + error.message);
          }
        })
      }
      this._notificationService.readNotification(userId, this.notificationId, true).subscribe()
    })
  }
}
