import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PlanService} from '../../services/plan.service';
import {NgClass} from '@angular/common';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-sleep-plans-table',
  standalone: true,
    imports: [
        NgClass,
        FormsModule,
        ReactiveFormsModule
    ],
  templateUrl: './sleep-plans-table.component.html',
  styleUrls: [
    './sleep-plans-table.component.scss',
  ]
})
export class SleepPlansTableComponent implements OnInit{
  sleepPlans: any;
  selectedSleepPlan: any;
  @Input() program!: any;
  @Output() emitSleepPlan = new EventEmitter();
  form: FormGroup = new FormGroup({
    name: new FormControl(''),
  });

  constructor(private _planService: PlanService) {
  }

  ngOnInit() {
    this._planService.getPlansFiltered('','','sleep').subscribe({
      next: (response) => {
        this.sleepPlans = response.plans;
      },
      error: (error) => {
        alert(error.message);
      }
    })

    // Show the plan already selected (Used in update form)
    if (this.program && this.program.sleepPlanId != null) {
      this._planService.getPlansById(this.program.sleepPlanId)
        .subscribe({
          next: (plan) => {
            this.selectedSleepPlan = plan;
            this.emitSleepPlan.emit(plan);
          }
        });
    }
  }

  selectPlan(plan: any) {
    this.selectedSleepPlan = plan;
    this.emitSleepPlan.emit(plan);
  }

  isSelected(sleepPlan: any) {
    return this.selectedSleepPlan && this.selectedSleepPlan.id == sleepPlan.id;
  }

  emitSearchPlan() {
    this._planService.getPlansFiltered(
      'public', this.form.value.name, 'sleep')
      .subscribe({
        next: (response) => {
          this.sleepPlans = response.plans;
          console.log(response.plans);
        }
      });
  }
}
