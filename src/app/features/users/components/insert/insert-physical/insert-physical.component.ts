import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ToastrService} from 'ngx-toastr';
import {UserWeightService} from '../../../../services/user-weight.service';
import {UserHeightService} from '../../../../services/user-height.service';

@Component({
  selector: 'app-insert-physical',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './insert-physical.component.html',
  styleUrl: './insert-physical.component.scss',
})
export class InsertPhysicalComponent {
  form: FormGroup = new FormGroup({
    weight: new FormControl('', Validators.required),
    height: new FormControl('', Validators.required),
  });

  constructor(private _userWeightService: UserWeightService, private _userHeightService: UserHeightService, private _toastrService: ToastrService) { }

  emitUserPhysical() {
    this._userWeightService.create(this.form.value.weight * 1000).subscribe({
      next: () => this._toastrService.success("Weight created successfully."),
      error: (error) => this._toastrService.error("Error creating the weight + " + error.message),
    });

    this._userHeightService.create(this.form.value.height).subscribe({
      next: () => this._toastrService.success("Height created successfully."),
      error: (error) => this._toastrService.error("Error creating the height + " + error.message),
    });
  }
}
