import {Component} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../../../../core/auth/services/auth.service';
import {GlobalMessagesService} from '../../../services/global-messages.service';
import {CreateGlobalMessageCommand} from '../../../utils/create-global-message-command';

@Component({
  selector: 'app-create-global-messages',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './create-global-messages.component.html',
  styleUrl: './create-global-messages.component.scss'
})
export class CreateGlobalMessagesComponent {
  formCreateGlobalMessage: FormGroup = new FormGroup({
    description: new FormControl('', [Validators.required]),
    startDatetime: new FormControl('', [Validators.required]),
    endDatetime: new FormControl('', [Validators.required]),
  });

  constructor(private _authService: AuthService, private _globalMessageServie: GlobalMessagesService) {
  }

  createGlobalMessage() {
    const creatorId = this._authService.getId();
    const description = this.formCreateGlobalMessage.get('description')?.value;
    const startDatetime = this.formCreateGlobalMessage.get('startDatetime')?.value;
    const endDatetime = this.formCreateGlobalMessage.get('endDatetime')?.value;

    const globalMessageCommand: CreateGlobalMessageCommand = {
      creatorId: creatorId,
      description: description,
      startDateTime: startDatetime,
      endDateTime: endDatetime,
    }
    console.log(globalMessageCommand);
    this._globalMessageServie.createGlobalMessage(globalMessageCommand).subscribe();
  }
}
