import {Component} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../../../../../core/auth/services/auth.service';
import {GlobalMessagesService} from '../../../../../../core/global-messages/services/global-messages.service';
import {CreateGlobalMessageCommand} from '../../../../utils/create-global-message-command';
import {ToastrService} from 'ngx-toastr';

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

  constructor(private _authService: AuthService, private _globalMessageServie: GlobalMessagesService, private _toastrService: ToastrService) {
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
    };

    const isConfirmed = window.confirm(`
    Are you sure you want to create this global message ?
    Description : ${description}
    Start Datetime : ${startDatetime}
    End Datetime : ${endDatetime}
    `);

    if (isConfirmed) {
      this._globalMessageServie.createGlobalMessage(globalMessageCommand).subscribe(
        () => {
          window.location.reload();
        },
        (error) => {
          this._toastrService.error(error);
        }
      );
    }
  }
}
