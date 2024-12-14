import { Injectable } from '@angular/core';
import {apis, environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {NutritionCalculatorCommand} from '../utils/nutrition-calculator-command';
import {Observable} from 'rxjs';
import {NutritionCalculatorOutput} from '../utils/nutrition-calculator-output';

@Injectable({
  providedIn: 'root'
})
export class NutritionCalculatorService {
  private static URL: string = `${environment.API_URL}/${apis.NUTRITION_CALCULATOR_URL}`;

  constructor(private _httpClient: HttpClient) { }

  public calculEatenCalories(nutritionCalculatorCommand: NutritionCalculatorCommand): Observable<NutritionCalculatorOutput>{
    return this._httpClient.post<NutritionCalculatorOutput>(NutritionCalculatorService.URL, nutritionCalculatorCommand);
  }
}
