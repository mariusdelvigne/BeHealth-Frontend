import {Component} from '@angular/core';
import {CreateNotificationsComponent} from './create-notifications/create-notifications.component';
import {MdbCheckboxModule} from 'mdb-angular-ui-kit/checkbox';
import {CreateGlobalMessagesComponent} from './create-global-messages/create-global-messages.component';

@Component({
  selector: 'app-create-communications',
  standalone: true,
  imports: [
    CreateNotificationsComponent,
    MdbCheckboxModule,
    CreateGlobalMessagesComponent
  ],
  templateUrl: './create-communications.component.html',
  styleUrl: './create-communications.component.scss'
})
export class CreateCommunicationsComponent {
  createGlobalMessages: boolean = false;
}
