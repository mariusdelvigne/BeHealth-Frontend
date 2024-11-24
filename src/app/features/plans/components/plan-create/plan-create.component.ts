import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {PlanService} from '../../services/plan.service';
import {AuthService} from '../../../../core/auth/services/auth.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-plan-create',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './plan-create.component.html',
  styleUrl: './plan-create.component.css',
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
export class PlanCreateComponent {
  form: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    category: new FormControl('sport'),
    privacy: new FormControl('private', Validators.required),
    description: new FormControl('', Validators.required),
    durationInDays: new FormControl('', Validators.required),
  });

  constructor(private _planService: PlanService, private  _authService: AuthService, private _toastrService: ToastrService) {
  }

  emitCreatePlan() {
    this._planService.create(this.form.value, this._authService.getId()).subscribe({
      next: () => {
        this._toastrService.success("Plan created successfully");
      },
      error: (error) => {
        this._toastrService.error("Error creating the plan : " + error.message);
      }
    })
  }

  get colorChange() {
    return this.form.invalid ? 'grey' : 'blue';
  }
}
