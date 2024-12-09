import {Component} from '@angular/core';
import {RouterLink} from "@angular/router";
import {AuthService} from '../auth/services/auth.service';
import {NotificationsDropdownViewComponent} from './notifications-dropdown-view/notifications-dropdown-view.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    NotificationsDropdownViewComponent
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  constructor(public authService: AuthService) { }
}
