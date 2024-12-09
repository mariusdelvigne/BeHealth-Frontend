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
  styleUrl: './notification-read.component.scss'
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
  timeFromReceive: string = "";

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
            this.timeFromReceive = this.getTimeFromReceive(notifications.sendingDateTime);
            console.log(this.timeFromReceive);
          },
          error: (error) => {
            this._toastrService.error("Error : " + error.message);
          }
        })
      }
      this._notificationService.readNotification(userId, this.notificationId, true).subscribe()
    })
  }

  getTimeFromReceive(sendingDateTime: string): string {
    const now = new Date();
    const sendingDate = new Date(sendingDateTime);

    const diffInMs = now.getTime() - sendingDate.getTime();

    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    const remainingHours = diffInHours % 24;
    const remainingMinutes = diffInMinutes % 60;

    return `${diffInDays} days, ${remainingHours} hours, ${remainingMinutes} minutes ago`;
  }

  markAsNotRead() {
    const userId = this._authService.getId();
    this._notificationService.readNotification(userId, this.notificationId, false).subscribe();
  }
}
