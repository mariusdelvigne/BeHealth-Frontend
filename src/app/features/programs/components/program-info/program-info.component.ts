import {Component, Input, OnInit} from '@angular/core';
import {FoodPlansTableComponent} from '../program-create/food-plans-table/food-plans-table.component';
import {SleepPlansTableComponent} from '../program-create/sleep-plans-table/sleep-plans-table.component';
import {SportPlansTableComponent} from '../program-create/sport-plans-table/sport-plans-table.component';
import {PlanService} from '../../../plans/services/plan.service';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-program-info',
  standalone: true,
  imports: [
    FoodPlansTableComponent,
    SleepPlansTableComponent,
    SportPlansTableComponent,
    NgClass
  ],
  templateUrl: './program-info.component.html',
  styleUrls: [
    './program-info.component.css',
    '../../../../shared/styles/plan-table.css',
  ]
})
export class ProgramInfoComponent implements OnInit {
  @Input() program: any;
  foodPlan: any;
  sportPlan: any;
  sleepPlan: any;
  selectedPlan: any;

  constructor(private _planService: PlanService) {
  }

  ngOnInit() {
    if (this.program.foodPlanId != null)
      this._planService.getPlansById(this.program.foodPlanId)
        .subscribe(plan => this.foodPlan = plan);
    if (this.program.sportPlanId != null)
      this._planService.getPlansById(this.program.sportPlanId)
        .subscribe(plan => this.sportPlan = plan);
    if (this.program.sleepPlanId != null)
      this._planService.getPlansById(this.program.sleepPlanId)
        .subscribe(plan => this.sleepPlan = plan);
  }

  showPlanInfo(planId: number) {
    this._planService.getPlansById(planId).subscribe(plan => this.selectedPlan = plan);
  }
}
