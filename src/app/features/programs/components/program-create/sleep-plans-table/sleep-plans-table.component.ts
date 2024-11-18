import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {PlanService} from '../../../../plans/services/plan.service';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-sleep-plans-table',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './sleep-plans-table.component.html',
  styleUrls: [
    './sleep-plans-table.component.css',
    '../../../../../shared/styles/plan-table.css'
  ]
})
export class SleepPlansTableComponent implements OnInit{
  sleepPlans: any;
  selectedSleepPlan: any;
  @Output() emitSleepPlan = new EventEmitter();

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
  }

  selectPlan(plan: any) {
    this.selectedSleepPlan = plan;
    this.emitSleepPlan.emit(plan);
  }

  isSelected(sleepPlan: any) {
    return this.selectedSleepPlan == sleepPlan;
  }
}
