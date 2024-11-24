import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {FoodPlansTableComponent} from '../program-create/food-plans-table/food-plans-table.component';
import {SleepPlansTableComponent} from '../program-create/sleep-plans-table/sleep-plans-table.component';
import {SportPlansTableComponent} from '../program-create/sport-plans-table/sport-plans-table.component';
import {ProgramService} from '../../services/program.service';
import {AuthService} from '../../../../core/auth/services/auth.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-program-update-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FoodPlansTableComponent,
    SleepPlansTableComponent,
    SportPlansTableComponent
  ],
  templateUrl: './program-update-form.component.html',
  styleUrl: './program-update-form.component.css'
})
export class ProgramUpdateFormComponent implements OnInit{
  @Input() program!: any;
  form: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3)]),
    privacy: new FormControl('', Validators.required),
    description: new FormControl('', [Validators.required, Validators.min(1)]),
    foodPlanId: new FormControl(0),
    sportPlanId: new FormControl(0),
    sleepPlanId: new FormControl(0),
  });

  selectedSportPlan: any = null;
  selectedSleepPlan: any = null;
  selectedFoodPlan: any = null;

  constructor(private _programService: ProgramService, private _authService: AuthService, private _toastrService: ToastrService) {
  }

  ngOnInit() {
    this.form.patchValue({
      title: this.program.title,
      privacy: this.program.privacy,
      description: this.program.description,
      foodPlanId: this.program.foodPlanId,
      sportPlanId: this.program.sportPlanId,
      sleepPlanId: this.program.sleepPlanId,
    });
  }

  updateProgram() {
    this._programService.updateProgram(this._authService.getId(), this.program.id, this.form.value).subscribe({
      next: () => {
        this._toastrService.success("Program updated successfully");
      },
      error: (error) => {
        this._toastrService.error("Error updating the program : " + error.message);
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
