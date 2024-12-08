import {Component, HostListener} from '@angular/core';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-notifications-dropdown-view',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './notifications-dropdown-view.component.html',
  styleUrl: './notifications-dropdown-view.component.css'
})
export class NotificationsDropdownViewComponent {
  showNotifications = false;

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
