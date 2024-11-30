import {Component, OnInit, Output, Input, EventEmitter} from '@angular/core';
import {PlanService} from '../../../plans/services/plan.service';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-sport-plans-table',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './sport-plans-table.component.html',
  styleUrls: [
    './sport-plans-table.component.css',
    '../../../../shared/styles/style.css'
  ]
})
export class SportPlansTableComponent implements OnInit{
  sportPlans: any;
  selectedSportPlan: any;
  @Input() program!: any;
  @Output() emitSportPlan = new EventEmitter();

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
}
