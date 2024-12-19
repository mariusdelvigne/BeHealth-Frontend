import {Component} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {UserSleepService} from '../../../../services/user-sleep.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-insert-sleep',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './insert-sleep.component.html',
  styleUrl: './insert-sleep.component.scss',
})
export class InsertSleepComponent {
  form: FormGroup = new FormGroup({
    startDatetime: new FormControl('', Validators.required),
    endDatetime: new FormControl('', Validators.required),
  });

  constructor(private _userSleepService: UserSleepService, private _toastrService: ToastrService) { }

  emitUserSleep() {
    this._userSleepService.create(this.form.value).subscribe({
      next: () => this._toastrService.success("Sleep created successfully."),
      error: (error) => this._toastrService.error("Error creating the sleep + " + error.message),
    });
  }
}
