import {Injectable} from '@angular/core';
import {apis, environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {SportCaloriesBurnedCalculatorCommand} from '../utils/sport-calories-burned-calculator-command';
import {Observable} from 'rxjs';
import {SportCaloriesBurnedCalculatorOutput} from '../utils/sport-calories-burned-calculator-output';

@Injectable({
  providedIn: 'root'
})
export class SportCaloriesBurnedCalculatorService {
  private static URL: string = `${environment.API_URL}/${apis.SPORT_CALCULATOR_URL}`;

  constructor(private _httpClient: HttpClient) { }

  public calculateCaloriesBurned(sportCaloriesBurnedCalculatorCommand: SportCaloriesBurnedCalculatorCommand): Observable<SportCaloriesBurnedCalculatorOutput> {
    return this._httpClient.post<SportCaloriesBurnedCalculatorOutput>(SportCaloriesBurnedCalculatorService.URL, sportCaloriesBurnedCalculatorCommand);
  }
}
