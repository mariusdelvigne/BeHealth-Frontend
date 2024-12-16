import {Component, OnInit, Output, Input, EventEmitter} from '@angular/core';
import {PlanService} from '../../services/plan.service';
import {NgClass} from '@angular/common';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-sport-plans-table',
  standalone: true,
  imports: [
    NgClass,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './sport-plans-table.component.html',
  styleUrls: [
    './sport-plans-table.component.scss',
  ]
})
export class SportPlansTableComponent implements OnInit{
  sportPlans: any;
  selectedSportPlan: any;
  @Input() program!: any;
  @Output() emitSportPlan = new EventEmitter();
  form: FormGroup = new FormGroup({
    name: new FormControl(''),
  });

  constructor(private _planService: PlanService) {
  }

  ngOnInit() {
    this._planService.getPlansFiltered('','','sport').subscribe({
      next: (response) => {
        this.sportPlans = response.plans;
      },
      error: (error) => {
        alert(error.message);
      }
    })

    // Show the plan already selected (Used in update form)
    if (this.program && this.program.sportPlanId != null) {
      this._planService.getPlansById(this.program.sportPlanId)
        .subscribe({
          next: (plan) => {
            this.selectedSportPlan = plan;
            this.emitSportPlan.emit(plan);
          }
        });
    }
  }

  selectPlan(plan: any) {
    this.selectedSportPlan = plan;
    this.emitSportPlan.emit(plan);
  }

  isSelected(sportPlan: any) {
    return this.selectedSportPlan && this.selectedSportPlan.id == sportPlan.id;
  }

  emitSearchPlan() {
    this._planService.getPlansFiltered(
      'public', this.form.value.name, 'sport')
      .subscribe({
        next: (response) => {
          this.sportPlans = response.plans;
          console.log(response.plans);
        }
      });
  }
}
