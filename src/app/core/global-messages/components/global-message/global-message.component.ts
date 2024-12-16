import { Component, OnInit } from '@angular/core';
import { GetAllGlobalMessagesOutput } from '../../utils/get-all-global-messages-output';
import { ToastrService } from 'ngx-toastr';
import {GlobalMessagesService} from '../../services/global-messages.service';

@Component({
  selector: 'app-global-message',
  standalone: true,
  imports: [],
  templateUrl: './global-message.component.html',
  styleUrl: './global-message.component.scss'
})
export class GlobalMessageComponent implements OnInit {
  isVisible: boolean = true;
  globalMessage: GetAllGlobalMessagesOutput[] = [];
  nbGlobalMessages: number = 0;

  constructor(
    private _globalMessageService: GlobalMessagesService,
    private _toastrService: ToastrService
  ) {}

  ngOnInit() {
    const bannerClosed = localStorage.getItem("globalMessageBannerClosed");
    this.isVisible = bannerClosed !== "true";

    this._globalMessageService.getAllGlobalMessages().subscribe({
      next: (globalMessage) => {
        const currentDate = new Date();

        this.globalMessage = globalMessage.messages;

        this.globalMessage = globalMessage.messages.map((message: GetAllGlobalMessagesOutput) => {
          const dateStart = this.convertStringToDate(message.startDatetime);
          const dateEnd = this.convertStringToDate(message.endDatetime);

          const isVisible = dateStart <= currentDate && dateEnd >= currentDate && !localStorage.getItem(`globalMessageBannerClosed${message.id}`);

          return { ...message, isVisible };
        });

        this.nbGlobalMessages = this.globalMessage.length;
      },
      error: (error) => {
        this._toastrService.error("Error : " + error.message);
      }
    });
  }

  closeBanner(id: number) {
    this.isVisible = false;
    localStorage.setItem(`globalMessageBannerClosed${id}`, "true");
    console.log(`globalMessageBannerClosed${id}`, "true");
  }

  convertStringToDate(dateString: string): Date {
    return new Date(dateString);
  }
}
