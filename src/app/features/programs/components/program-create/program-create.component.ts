import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../../core/auth/services/auth.service';
import {ProgramService} from '../../services/program.service';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {FoodService} from '../../../../shared/services/food.service';
import {FoodPlansTableComponent} from './food-plans-table/food-plans-table.component';
import {SportPlansTableComponent} from './sport-plans-table/sport-plans-table.component';
import {SleepPlansTableComponent} from './sleep-plans-table/sleep-plans-table.component';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-program-create',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FoodPlansTableComponent,
    SportPlansTableComponent,
    SleepPlansTableComponent
  ],
  templateUrl: './program-create.component.html',
  styleUrl: './program-create.component.css'
})
export class ProgramCreateComponent {
  form: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    privacy: new FormControl('private', Validators.required),
    description: new FormControl('', Validators.required),
    foodPlanId: new FormControl(0),
    sportPlanId: new FormControl(0),
    sleepPlanId: new FormControl(0),
  });
  selectedSportPlan: any = null;
  selectedSleepPlan: any = null;
  selectedFoodPlan: any = null;

  constructor(private _programService: ProgramService, private _authService: AuthService, private _toastrService: ToastrService) {
  }

  emitCreateProgram() {
    this._programService.create(this.form.value, this._authService.getId()).subscribe({
      next: () => {
        this._toastrService.success("Program created successfully");
      },
      error: (error) => {
        this._toastrService.error("Error creating the program : " + error.message);
      }
    })
  }

  setSelectedSportPlan(sportPlan: any) {
    this.selectedSportPlan = sportPlan;
    this.form.patchValue({
      sportPlanId: sportPlan.id,
    })
  }

  setSelectedSleepPlan(sleepPlan: any) {
    this.selectedSleepPlan = sleepPlan;
    this.form.patchValue({
      sleepPlanId: sleepPlan.id,
    })
  }

  setSelectedFoodPlan(foodPlan: any) {
    this.selectedFoodPlan = foodPlan;
    this.form.patchValue({
      foodPlanId: foodPlan.id,
    })
  }
}
