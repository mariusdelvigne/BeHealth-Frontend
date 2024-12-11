import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-notifications-admin',
  standalone: true,
  imports: [
    RouterOutlet
  ],
  templateUrl: './notifications-admin.component.html',
  styleUrl: './notifications-admin.component.scss'
})
export class NotificationsAdminComponent {

}
