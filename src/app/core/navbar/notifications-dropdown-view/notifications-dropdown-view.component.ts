import {Component, HostListener, OnInit} from '@angular/core';
import {RouterLink} from "@angular/router";
import {NotificationSearchOutput} from '../../../shared/utils/notification-search-output';
import {NotificationService} from '../../../shared/services/notification.service';
import {AuthService} from '../../auth/services/auth.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-notifications-dropdown-view',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './notifications-dropdown-view.component.html',
  styleUrl: './notifications-dropdown-view.component.css'
})
export class NotificationsDropdownViewComponent implements OnInit {
  notificationsNotRead: NotificationSearchOutput[] = [];
  showNotifications = false;

  constructor(private _notificationService: NotificationService, private _authService: AuthService, private _toastrService: ToastrService) {}

  ngOnInit() {
    console.log(this._authService.getId())
    this._notificationService.getNotificationByUserId(this._authService.getId()).subscribe({
      next: (notifications) => {
        this.notificationsNotRead = notifications.notifications;
      },
      error: (error) => {
        console.log(error);
        this._toastrService.error("Error : "+ error.message);
      }
    })
  }

  toggleNotifications() {
    this.showNotifications = !this.showNotifications;
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.position-relative')) {
      this.showNotifications = false;
    }
  }

}
