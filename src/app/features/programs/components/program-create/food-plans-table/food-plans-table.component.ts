import {Component, OnInit} from '@angular/core';
import {ProgramService} from '../../../services/program.service';
import {AuthService} from '../../../../../core/auth/services/auth.service';
import {FoodService} from '../../../../../shared/services/food.service';
import {PlanService} from '../../../../plans/services/plan.service';

@Component({
  selector: 'app-food-plans-table',
  standalone: true,
  imports: [],
  templateUrl: './food-plans-table.component.html',
  styleUrl: './food-plans-table.component.css'
})
export class FoodPlansTableComponent implements OnInit {
  foodPlans: any;

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
}
