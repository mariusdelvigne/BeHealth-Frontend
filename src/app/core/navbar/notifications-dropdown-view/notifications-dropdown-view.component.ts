import {Component, HostListener, OnInit} from '@angular/core';
import {NavigationEnd, Router, RouterLink} from "@angular/router";
import {NotificationSearchOutput} from '../../../shared/utils/notification-search-output';
import {NotificationService} from '../../../shared/services/notification.service';
import {AuthService} from '../../auth/services/auth.service';
import {ToastrService} from 'ngx-toastr';
import {filter} from "rxjs";

@Component({
  selector: 'app-notifications-dropdown-view',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './notifications-dropdown-view.component.html',
  styleUrl: './notifications-dropdown-view.component.scss'
})
export class NotificationsDropdownViewComponent implements OnInit {
  notificationsNotRead: NotificationSearchOutput[] = [];
  showNotifications = false;

  constructor(private _notificationService: NotificationService, private _authService: AuthService, private _toastrService: ToastrService, private _router: Router) {}

  ngOnInit() {
    this.loadNotifications();

    this._router.events.pipe(
        filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.loadNotifications();
    });
  }

  loadNotifications() {
    this._notificationService.getNotificationReadByUserId(this._authService.getId(), false).subscribe({
      next: (notifications) => {
        this.notificationsNotRead = notifications.notifications;
      },
      error: (error) => {
        console.log(error);
        this._toastrService.error("Error : " + error.message);
      }
    });
  }

  toggleNotifications() {
    this.showNotifications = !this.showNotifications;
  }

  get unreadCount(): number {
    return this.notificationsNotRead.length;
  }

  get unreadCountDisplay(): string {
    if (this.notificationsNotRead.length > 99) {
      return "99+"
    }
    return this.notificationsNotRead.length.toString();
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.position-relative')) {
      this.showNotifications = false;
    }
  }

}
