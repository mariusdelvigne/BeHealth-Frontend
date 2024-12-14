import {Component, EventEmitter, Output} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-plan-sport-create',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './plan-sport-create.component.html',
  styleUrl: './plan-sport-create.component.scss'
})
export class PlanSportCreateComponent {
  @Output()
  onPlanSportCreated = new EventEmitter<any>();

  form: FormGroup =  new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(1)]),
    dayNumber: new FormControl('', [Validators.required, Validators.min(1)]),
    dayTime: new FormControl('', Validators.required),
    durationInMin: new FormControl('', [Validators.required, Validators.min(1)]),
  });

  addPlanSport(event: SubmitEvent) {
    event.preventDefault();
    this.onPlanSportCreated.emit(this.form.value);

    this.form.reset();
    const sportNameInput = document.querySelector('#sport-name') as HTMLInputElement;
    sportNameInput.focus();
  }
}
