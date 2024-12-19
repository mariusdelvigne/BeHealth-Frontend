import {Injectable} from '@angular/core';
import {apis, environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {BmiCalculatorCommand} from '../utils/bmi-calculator-command';
import {Observable} from 'rxjs';
import {BmiCalculatorOutput} from '../utils/bmi-calculator-output';

@Injectable({
  providedIn: 'root'
})
export class BmiCalculatorService {
  private static URL: string = `${environment.API_URL}/${apis.BMI_CALCULATOR_URL}`;

  constructor(private _httpClient: HttpClient) { }

  public calculBmi(calculBmiCommand: BmiCalculatorCommand): Observable<BmiCalculatorOutput> {
    return this._httpClient.post<BmiCalculatorOutput>(BmiCalculatorService.URL, calculBmiCommand);
  }
}
