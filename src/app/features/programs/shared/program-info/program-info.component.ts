import {Component, Input, OnInit} from '@angular/core';
import {PlanService} from '../../../plans/services/plan.service';
import {NgClass} from '@angular/common';
import {PlanInfoComponent} from "../../../plans/shared/plan-info/plan-info.component";

@Component({
  selector: 'app-program-info',
  standalone: true,
    imports: [
        NgClass,
        PlanInfoComponent
    ],
  templateUrl: './program-info.component.html',
  styleUrls: [
    './program-info.component.scss',
  ]
})
export class ProgramInfoComponent implements OnInit {
  @Input() program: any;
  foodPlan: any;
  sportPlan: any;
  sleepPlan: any;
  selectedPlan: any;
  tags: any[] = [];

  constructor(private _planService: PlanService) {
  }

  ngOnInit() {
    if (this.program.foodPlanId != null)
      this._planService.getPlanById(this.program.foodPlanId)
        .subscribe(plan => this.foodPlan = plan);
    if (this.program.sportPlanId != null)
      this._planService.getPlanById(this.program.sportPlanId)
        .subscribe(plan => this.sportPlan = plan);
    if (this.program.sleepPlanId != null)
      this._planService.getPlanById(this.program.sleepPlanId)
        .subscribe(plan => this.sleepPlan = plan);
  }

  showPlanInfo(planId: number) {
    this.tags = [];
    if (this.selectedPlan?.id == planId) {
      this.selectedPlan = null;
    } else {
      this.selectedPlan = null;
      this._planService.getPlanById(planId).subscribe({
        next: (plan) => {
          if (plan.category === 'sport')
            this.selectedPlan = {...plan, sports: []};
          else if (plan.category === 'food')
            this.selectedPlan = {...plan, foods: []};
          else
            this.selectedPlan = {...plan, sleep: null};

          this.loadTags(planId);
        }
      });
    }
  }

  loadTags(planId: number) {
    this._planService.getTags(planId).subscribe({
      next: (response) => {
        this.tags = response.astPlansTags;
      },
      error: (error) => {
        alert(error.message);
      }
    });
  }
}
