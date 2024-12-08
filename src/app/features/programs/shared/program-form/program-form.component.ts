import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ProgramService} from '../../services/program.service';
import {AuthService} from '../../../../core/auth/services/auth.service';
import {ToastrService} from 'ngx-toastr';
import {FoodPlansTableComponent} from '../../../plans/shared/food-plans-table/food-plans-table.component';
import {SportPlansTableComponent} from '../../../plans/shared/sport-plans-table/sport-plans-table.component';
import {SleepPlansTableComponent} from '../../../plans/shared/sleep-plans-table/sleep-plans-table.component';

@Component({
  selector: 'app-program-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FoodPlansTableComponent,
    SportPlansTableComponent,
    SleepPlansTableComponent
  ],
  templateUrl: './program-form.component.html',
  styleUrl: './program-form.component.scss'
})
export class ProgramFormComponent implements OnInit {
  @Input() mode: string = '';
  @Input() programId!: number;
  program: any;
  form: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3)]),
    privacy: new FormControl('private', Validators.required),
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
    if (this.mode == "create") {

    } else if (this.mode == "update") {
      this._programService.getProgramById(this.programId).subscribe( {
        next: (program) => {
          this.program = program;

          this.form.patchValue({
            title: this.program.title,
            privacy: this.program.privacy,
            description: this.program.description,
            foodPlanId: this.program.foodPlanId,
            sportPlanId: this.program.sportPlanId,
            sleepPlanId: this.program.sleepPlanId,
          });
        }
      });
    }
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

  submit() {
    if (this.mode == "create") {
      this._programService.create(this.form.value, this._authService.getId()).subscribe({
        next: () => {
          this._toastrService.success("Program created successfully");
        },
        error: (error) => {
          this._toastrService.error("Error creating the program : " + error.message);
        }
      });
    } else if (this.mode == "update") {
      this._programService.updateProgram( this._authService.getId(), this.program.id, this.form.value).subscribe({
        next: () => {
          this._toastrService.success("Program updated successfully");
        },
        error: (error) => {
          this._toastrService.error("Error updating the program : " + error.message);
        }
      })
    }
  }
}
