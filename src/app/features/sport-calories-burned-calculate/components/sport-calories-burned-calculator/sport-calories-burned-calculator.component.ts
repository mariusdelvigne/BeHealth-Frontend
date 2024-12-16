import {Component} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {SportCaloriesBurnedCalculatorService} from '../../services/sport-calories-burned-calculator.service';
import {ToastrService} from 'ngx-toastr';
import {SportCaloriesBurnedCalculatorOutput} from '../../utils/sport-calories-burned-calculator-output';

@Component({
  selector: 'app-sport-calories-burned-calculator',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './sport-calories-burned-calculator.component.html',
  styleUrl: './sport-calories-burned-calculator.component.scss',
})
export class SportCaloriesBurnedCalculatorComponent {
  allSport: { name: string; value: string }[] = [
    { name: "Running", value: "running" },
    { name: "Football", value: "soccer" },
    { name: "Basketball", value: "basketball" },
    { name: "Swimming", value: "swimming" },
    { name: "Road Cycling", value: "road cycling" },
    { name: "Yoga", value: "yoga" },
    { name: "Boxing", value: "boxing" },
    { name: "American football", value: "american football" },
    { name: "Tennis", value: "tennis" },
    { name: "Hiking", value: "hiking" },
    { name: "Rowing", value: "rowing" },
    { name: "Weight lifting", value: "weight lifting" },
    { name: "Trampoline", value: "trampoline" },
    { name: "Skiing", value: "skiing" },
    { name: "Surfing", value: "surfing" },
    { name: "Dancing", value: "dancing" },
    { name: "Walking", value: "walking" },
    { name: "Road Climbing", value: "road climbing" },
    { name: "Martial Art", value: "martial art" },
    { name: "Stretching", value: "stretching" },
    { name: "Bowling", value: "bowling" }
  ];

  form: FormGroup = new FormGroup({
    sport: new FormControl('', [Validators.required]),
    durationInMinute: new FormControl('', [Validators.required]),
    weightInKg: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
    heightInCm: new FormControl('', [Validators.required]),
    age: new FormControl('', [Validators.required]),
  });

  resultCaloriesBurned: SportCaloriesBurnedCalculatorOutput = {
    nameSport: "",
    durationMinutes: 0,
    calories: 0,
  };

  constructor(private _sportCaloriesBurnedCalculatorService: SportCaloriesBurnedCalculatorService, private _toastrService: ToastrService) {
  }

  calculCaloriesBurned() {
    this._sportCaloriesBurnedCalculatorService.calculateCaloriesBurned(this.form.value).subscribe({
      next: (response) => {
        const selectedSportValue = this.form.value.sport;
        const selectedSportName = this.allSport.find(sport => sport.value === selectedSportValue);

        this.resultCaloriesBurned.nameSport = <string>selectedSportName?.name;
        this.resultCaloriesBurned.durationMinutes = response.durationMinutes;
        this.resultCaloriesBurned.calories = response.calories;

        this._toastrService.success("Sport Calories Burned computed successfully");
      },
      error: (error) => {
        this._toastrService.error("Sport Calories Burned computing failed : " + error.message)
      }
    })
  }
}
