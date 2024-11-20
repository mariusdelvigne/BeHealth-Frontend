import { Component } from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {NutritionCalculatorOutput} from '../../utils/nutrition-calculator-output';
import {NutritionCalculatorService} from '../../services/nutrition-calculator.service';

@Component({
  selector: 'app-nutrition-calculator',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './nutrition-calculator.component.html',
  styleUrl: './nutrition-calculator.component.css',
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
export class NutritionCalculatorComponent {
  form: FormGroup = new FormGroup({
    nameFood: new FormControl('', [Validators.required]),
    quantityInGrams: new FormControl(''),
  });

  resultNutriment: NutritionCalculatorOutput = {
    foodsName: "",
    servingsWeights: 0.0,
    calories: 0.0,
    totalFats: 0.0,
    saturedFats: 0.0,
    cholesterol: 0.0,
    sodium: 0.0,
    totalCarbohydrates: 0.0,
    dietaryFiber: 0.0,
    sugars: 0.0,
    proteins: 0.0,
    potassiums: 0.0,
  }

  constructor(private _nutritionCalculatorService: NutritionCalculatorService) {
  }

  get colorChange() {
    return this.form.invalid ? 'grey' : 'blue';
  }

  calculNutrition() {
    this._nutritionCalculatorService.calculEatenCalories(this.form.value).subscribe({
      next: (response) => {
        this.resultNutriment.foodsName = response.foodsName;
        this.resultNutriment.servingsWeights = response.servingsWeights;
        this.resultNutriment.calories = response.calories;
        this.resultNutriment.totalFats = response.totalFats;
        this.resultNutriment.saturedFats = response.saturedFats;
        this.resultNutriment.cholesterol = response.cholesterol;
        this.resultNutriment.sodium = response.sodium;
        this.resultNutriment.totalCarbohydrates = response.totalCarbohydrates;
        this.resultNutriment.dietaryFiber = response.dietaryFiber;
        this.resultNutriment.sugars = response.sugars;
        this.resultNutriment.proteins = response.proteins;
        this.resultNutriment.potassiums = response.potassiums;
        console.log(this.resultNutriment);
      },
      error: (error) => {
        alert(error.message);
      }
    })
  }
}
