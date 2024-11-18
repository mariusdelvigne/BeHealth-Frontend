import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ProgramService} from '../../../services/program.service';
import {AuthService} from '../../../../../core/auth/services/auth.service';
import {FoodService} from '../../../../../shared/services/food.service';
import {PlanService} from '../../../../plans/services/plan.service';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-food-plans-table',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './food-plans-table.component.html',
  styleUrls: [
    './food-plans-table.component.css',
    '../../../../../shared/styles/plan-table.css'
  ]
})
export class FoodPlansTableComponent implements OnInit {
  foodPlans: any;
  selectedFoodPlan: any;
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
  }

  selectPlan(plan: any) {
    this.selectedFoodPlan = plan;
    this.emitFoodPlan.emit(plan);
  }

  isSelected(foodPlan: any) {
    return this.selectedFoodPlan == foodPlan;
  }
}
