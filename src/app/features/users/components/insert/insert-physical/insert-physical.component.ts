import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {animate, state, style, transition, trigger} from '@angular/animations';
import {ToastrService} from 'ngx-toastr';
import {UserWeightService} from '../../../../../shared/services/user-weight.service';
import {UserHeightService} from '../../../../../shared/services/user-height.service';

@Component({
  selector: 'app-insert-physical',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './insert-physical.component.html',
  styleUrl: './insert-physical.component.scss',
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
export class InsertPhysicalComponent {
  form: FormGroup = new FormGroup({
    weight: new FormControl('', Validators.required),
    height: new FormControl('', Validators.required),
  });

  constructor(private _userWeightService: UserWeightService, private _userHeightService: UserHeightService, private _toastrService: ToastrService) { }

  emitUserPhysical() {
    this._userWeightService.create(this.form.value.weight * 1000).subscribe({
      next: response => this._toastrService.success("Weight created successfully."),
      error: (error) => this._toastrService.error("Error creating the weight + " + error.message),
    });

    this._userHeightService.create(this.form.value.height).subscribe({
      next: response => this._toastrService.success("Height created successfully."),
      error: (error) => this._toastrService.error("Error creating the height + " + error.message),
    });
  }

  get colorChange() {
    return this.form.invalid ? 'grey' : 'blue';
  }

}
