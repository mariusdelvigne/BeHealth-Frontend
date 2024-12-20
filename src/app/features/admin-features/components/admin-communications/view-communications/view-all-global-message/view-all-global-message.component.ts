import {Component, OnInit} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {GetAllGlobalMessagesOutput} from '../../../../../../core/global-messages/utils/get-all-global-messages-output';
import {GlobalMessagesService} from '../../../../../../core/global-messages/services/global-messages.service';

@Component({
  selector: 'app-view-all-global-message',
  standalone: true,
  imports: [],
  templateUrl: './view-all-global-message.component.html',
  styleUrl: './view-all-global-message.component.scss'
})
export class ViewAllGlobalMessageComponent implements OnInit {
  globalMessages: GetAllGlobalMessagesOutput[] = [];
  pageNumber = 1;

  constructor(private _globalMessagesService: GlobalMessagesService, private _toastrService: ToastrService) {}

  ngOnInit() {
    this.loadData();
  }

  deleteGlobalMessages(id: number) {
    this._globalMessagesService.deleteGlobalMessages(id).subscribe({
      next: () => window.location.reload(),
    });
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

  previousPage() {
    this.pageNumber--;
    this.loadData();
  }

  nextPage() {
    this.pageNumber++;
    this.loadData();
  }

  loadData() {
    this._globalMessagesService.getAllGlobalMessages(this.pageNumber - 1).subscribe({
      next: (globalMessage) => {
        this.globalMessages = globalMessage.messages;
      },
      error: (error) => {
        this._toastrService.error("Error : " + error.message);
      }
    })
  }
}
