import { Component } from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {animate, state, style, transition, trigger} from '@angular/animations';
import {UserPeriodService} from '../../../../../shared/services/user-period.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-insert-period',
  standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule
    ],
  templateUrl: './insert-period.component.html',
  styleUrl: './insert-period.component.scss',
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
export class InsertPeriodComponent {
  form: FormGroup = new FormGroup({
    startDate: new FormControl('', Validators.required),
    endDate: new FormControl('', Validators.required),
  });

  constructor(private _userPeriodService: UserPeriodService, private _toastrService: ToastrService) { }

  emitUserPeriod() {
    this._userPeriodService.create(this.form.value).subscribe({
      next: response => this._toastrService.success("Period created successfully"),
      error: (error) => this._toastrService.error("Error creating the period : " + error.message),
    });
  }

  get colorChange() {
    return this.form.invalid ? 'grey' : 'blue';
  }
}
