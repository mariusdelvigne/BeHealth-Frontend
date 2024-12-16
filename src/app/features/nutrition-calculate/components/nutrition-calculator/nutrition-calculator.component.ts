import { Component } from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {NutritionCalculatorOutput} from '../../utils/nutrition-calculator-output';
import {NutritionCalculatorService} from '../../services/nutrition-calculator.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-nutrition-calculator',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './nutrition-calculator.component.html',
  styleUrl: './nutrition-calculator.component.scss',
})
export class NutritionCalculatorComponent {
  form: FormGroup = new FormGroup({
    nameFood: new FormControl('', [Validators.required]),
    quantityInGrams: new FormControl(''),
  });

  resultNutriment: NutritionCalculatorOutput = {
    foodsName: "",
    servingWeights: 0.0,
    calories: 0.0,
    totalFats: 0.0,
    saturatedFats: 0.0,
    cholesterol: 0.0,
    sodium: 0.0,
    totalCarbohydrates: 0.0,
    dietaryFiber: 0.0,
    sugars: 0.0,
    proteins: 0.0,
    potassium: 0.0,
  }

  constructor(private _nutritionCalculatorService: NutritionCalculatorService, private _toastrService: ToastrService) {
  }

  calculNutrition() {
    this._nutritionCalculatorService.calculEatenCalories(this.form.value).subscribe({
      next: (response) => {
        this.resultNutriment = response;
        this.resultNutriment.foodsName = response.foodsName;
        this._toastrService.success("Nutrition computed successfully");
      },
      error: (error) => {
        this._toastrService.error("Nutrition computing failed : " + error.message)
      }
    })
  }
}
