import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {PlanService} from '../../services/plan.service';
import {AuthService} from '../../../../core/auth/services/auth.service';

@Component({
  selector: 'app-plan-create',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './plan-create.component.html',
  styleUrl: './plan-create.component.css'
})
export class PlanCreateComponent {
  form: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    category: new FormControl('sport'),
    privacy: new FormControl('Private', Validators.required),
    description: new FormControl('', Validators.required),
    durationInDays: new FormControl('', Validators.required),
  });

  constructor(private _planService: PlanService, private  _authService: AuthService) {
  }

  emitCreatePlan() {
    console.log(this.form.value);
    this._planService.create(this.form.value, this._authService.getId()).subscribe({
      next: () => {
        alert("Plan created successfully.");
      },
      error: (error) => {
        alert(error.message);
      }
    })
  }
}
