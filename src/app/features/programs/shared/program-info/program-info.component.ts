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
    this.tags = [];
    if (this.selectedPlan?.id == planId) {
      this.selectedPlan = null;
    } else {
      this.selectedPlan = null;
      this._planService.getPlansById(planId).subscribe({
        next: (plan) => {
          this.selectedPlan = plan;
          this.loadTags(planId);
          this.loadContent(planId, this.selectedPlan.category);
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

  loadContent(planId: number, category: string) {
    this._planService.getContent(planId, 0).subscribe({
      next: (response) => {
        if (category === 'sport') {
          this.selectedPlan.sports = response.sports;
        } else if (category === 'food') {
          this.selectedPlan.foods = response.foods;
        }
      },
      error: (error) => {
        alert(error.message);
      }
    });
  }
}
