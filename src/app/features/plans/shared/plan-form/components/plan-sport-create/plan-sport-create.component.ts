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
    name: new FormControl('', Validators.required),
    dayNumber: new FormControl('', Validators.required),
    dayTime: new FormControl('', Validators.required),
    durationInMin: new FormControl('', Validators.required),
  });

  addPlanSport(event: SubmitEvent) {
    event.preventDefault();
    this.onPlanSportCreated.emit(this.form.value);
    this.form.reset();
  }
}
