import {Component} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {BmiCalculatorService} from '../../services/bmi-calculator.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-bmi-calculator',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './bmi-calculator.component.html',
  styleUrl: './bmi-calculator.component.scss',
})
export class BmiCalculatorComponent {
  form: FormGroup = new FormGroup({
    gender: new FormControl('male', Validators.required),
    age: new FormControl('', Validators.required),
    heightInCm: new FormControl('', Validators.required),
    weightInKg: new FormControl('', Validators.required),
  });
  resultBmi: number = 0.00;
  resultBmiInterpretation: string = "";

  constructor(private _bmiCalculatorService: BmiCalculatorService, private _toastrService: ToastrService) {
  }

  calculBmi() {
    this._bmiCalculatorService.calculBmi(this.form.value).subscribe({
      next: (response) => {
        this.resultBmi = Number(response.bmi.toFixed(2));
        this.resultBmiInterpretation = response.bmiInterpretetion;
        this._toastrService.success("BMI computed successfully")
        this.form.reset();
      },
      error: (error) => {
        this._toastrService.error("BMI computing failed : " + error.message);
      }
    })
  }
}
