import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PlanService} from '../../services/plan.service';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-food-plans-table',
  standalone: true,
  imports: [
    NgClass,
  ],
  templateUrl: './food-plans-table.component.html',
  styleUrls: [
    './food-plans-table.component.scss',
  ]
})
export class FoodPlansTableComponent implements OnInit {
  foodPlans: any;
  selectedFoodPlan: any;
  @Input() program!: any;
  @Output() emitFoodPlan = new EventEmitter();

  constructor(private _planService: PlanService) {
  }

  ngOnInit() {
    this._planService.getPlansFiltered('','','food').subscribe({
      next: (response) => {
        this.foodPlans = response.plans;
      },
      error: (error) => {
        alert(error.message);
      }
    })

    // Show the plan already selected (Used in update form)
    if (this.program && this.program.foodPlanId != null) {
      this._planService.getPlanById(this.program.foodPlanId)
        .subscribe({
          next: (plan) => {
            this.selectedFoodPlan = plan;
            this.emitFoodPlan.emit(plan);
          }
        });
    }
  }

  selectPlan(plan: any) {
    this.selectedFoodPlan = plan;
    this.emitFoodPlan.emit(plan);
  }

  isSelected(foodPlan: any) {
    return this.selectedFoodPlan && this.selectedFoodPlan.id == foodPlan.id;
  }
}
