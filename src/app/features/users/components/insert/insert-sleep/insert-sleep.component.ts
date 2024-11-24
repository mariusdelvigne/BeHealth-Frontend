import {Component} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {UserSleepService} from '../../../../../shared/services/user-sleep.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-insert-sleep',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './insert-sleep.component.html',
  styleUrl: './insert-sleep.component.css',
  animations: [
    trigger('colorChange', [
      state('grey', style({
        backgroundColor: 'rgba(173, 181, 189, 0.3)',
        border: '3px solid rgba(173, 181, 189, 0.5)',
      })),
      state('blue', style({
        backgroundColor: 'rgba(13, 110, 253, 0.3)',
        border: '3px solid rgba(13, 110, 253, 0.5)',
      })),
      transition('grey <=> blue', [
        animate('1s ease-out')
      ])
    ])
  ]
})
export class InsertSleepComponent {
  form: FormGroup = new FormGroup({
    startDatetime: new FormControl('', Validators.required),
    endDatetime: new FormControl('', Validators.required),
  });

  constructor(private _userSleepService: UserSleepService, private _toastrService: ToastrService) { }

  emitUserSleep() {
    this._userSleepService.create(this.form.value).subscribe({
      next: response => this._toastrService.success("Sleep created successfully."),
      error: (error) => this._toastrService.error("Error creating the sleep + " + error.message),
    });
  }

  get colorChange() {
    return this.form.invalid ? 'grey' : 'blue';
  }

}
