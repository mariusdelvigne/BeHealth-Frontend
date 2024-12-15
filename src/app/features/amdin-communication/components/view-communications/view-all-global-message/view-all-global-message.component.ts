import {Component, OnInit} from '@angular/core';
import {GetAllGlobalMessagesOutput} from '../../../../../core/global-messages/utils/get-all-global-messages-output';
import {GlobalMessagesService} from '../../../services/global-messages.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-view-all-global-message',
  standalone: true,
  imports: [],
  templateUrl: './view-all-global-message.component.html',
  styleUrl: './view-all-global-message.component.scss'
})
export class ViewAllGlobalMessageComponent implements OnInit {
  globalMessages: GetAllGlobalMessagesOutput[] = [];

  constructor(private _globalMessagesService: GlobalMessagesService, private _toastrService: ToastrService) {}

  ngOnInit() {
    this._globalMessagesService.getAllGlobalMessages().subscribe({
      next: (globalMessage) => {
        this.globalMessages = globalMessage.messages;
      },
      error: (error) => {
        this._toastrService.error("Error : " + error.message);
      }
    })
  }

  deleteGlobalMessages(id: number) {
    this._globalMessagesService.deleteGlobalMessages(id).subscribe()
    window.location.reload();
  }

  getDateTime(sendingDateTime: string): string {
    const date = new Date(sendingDateTime);

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}`;
  }
}
