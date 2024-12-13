import {Component, EventEmitter, Output} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'app-plan-food-create',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './plan-food-create.component.html',
  styleUrl: './plan-food-create.component.scss'
})
export class PlanFoodCreateComponent {
  @Output()
  onPlanFoodCreated = new EventEmitter<any>();

  form: FormGroup =  new FormGroup({
    name: new FormControl('', Validators.required),
    dayNumber: new FormControl('', Validators.required),
    dayTime: new FormControl('', Validators.required),
    quantityInG: new FormControl('', Validators.required),
  });

  addPlanFood(event: SubmitEvent) {
    event.preventDefault();
    this.onPlanFoodCreated.emit(this.form.value);

    this.form.reset();
    const foodNameInput = document.querySelector("#food-name") as HTMLInputElement;
    foodNameInput.focus();
  }
}
