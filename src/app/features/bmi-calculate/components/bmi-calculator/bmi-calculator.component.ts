import {Component} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {animate, state, style, transition, trigger} from '@angular/animations';
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
export class BmiCalculatorComponent {
  form: FormGroup = new FormGroup({
    gender: new FormControl('Male', Validators.required),
    age: new FormControl('', Validators.required),
    heightInCm: new FormControl('', Validators.required),
    weightInKg: new FormControl('', Validators.required),
  });
  resultBmi: number = 0.00;
  resultBmiInterpretation: string = "";

  constructor(private _bmiCalculatorService: BmiCalculatorService, private _toastrService: ToastrService) {
  }

  get colorChange() {
    return this.form.invalid ? 'grey' : 'blue';
  }

  calculBmi() {
    this._bmiCalculatorService.calculBmi(this.form.value).subscribe({
      next: (response) => {
        this.resultBmi = Number(response.bmi.toFixed(2));
        this.resultBmiInterpretation = response.bmiInterpretetion;
        this._toastrService.success("BMI computed successfully")
      },
      error: (error) => {
        this._toastrService.error("BMI computing failed : " + error.message);
      }
    })
  }
}
