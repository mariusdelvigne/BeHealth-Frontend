import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {NutritionCalculatorOutput} from '../../utils/nutrition-calculator-output';
import {NutritionCalculatorService} from '../../services/nutrition-calculator.service';
import {ToastrService} from 'ngx-toastr';
import {FoodService} from '../../../services/food.service';
import {debounceTime} from 'rxjs';

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
export class NutritionCalculatorComponent implements OnInit {
  form: FormGroup = new FormGroup({
    nameFood: new FormControl('', [Validators.required]),
    quantityInGrams: new FormControl('100'),
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

  foods: any[] = [];

  constructor(private _nutritionCalculatorService: NutritionCalculatorService, private _toastrService: ToastrService, private _foodService: FoodService) {
  }

  ngOnInit() {
    this.form.get('nameFood')?.valueChanges
      .pipe(debounceTime(300))
      .subscribe(value => {
        this.updateFoodList(value);
      });
  }

  updateFoodList(name: string) {
    this._foodService.getAllStartingWith(name)
      .subscribe({
        next: response => this.foods = response.foods,
      });
  }

  calculNutrition() {
    this._nutritionCalculatorService.calculEatenCalories(this.form.value).subscribe({
      next: (response) => {
        this.resultNutriment = response;
        this.resultNutriment.foodsName = response.foodsName;
        this._toastrService.success("Nutrition computed successfully");
        this.form.reset();
      },
      error: (error) => {
        this._toastrService.error("Nutrition computing failed : " + error.message)
      }
    })
  }
}
