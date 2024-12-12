import {Component} from '@angular/core';
import {ViewAllNotificationsComponent} from './view-all-notifications/view-all-notifications.component';
import {MdbCheckboxModule} from 'mdb-angular-ui-kit/checkbox';
import {ViewAllGlobalMessageComponent} from './view-all-global-message/view-all-global-message.component';

@Component({
  selector: 'app-view-communications',
  standalone: true,
  imports: [
    ViewAllNotificationsComponent,
    MdbCheckboxModule,
    ViewAllGlobalMessageComponent
  ],
  templateUrl: './view-communications.component.html',
  styleUrl: './view-communications.component.scss'
})
export class ViewCommunicationsComponent {
  viewAllGlobalMessages: boolean = false;
}
