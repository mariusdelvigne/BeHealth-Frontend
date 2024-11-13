import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

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
    category: new FormControl('', Validators.required),
    privacy: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    durationInDays: new FormControl('', Validators.required),
  });

}
