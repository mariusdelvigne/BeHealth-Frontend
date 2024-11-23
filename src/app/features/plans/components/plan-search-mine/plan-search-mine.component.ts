import {Component, OnInit} from '@angular/core';
import {ReactiveFormsModule} from "@angular/forms";
import {PlanService} from '../../services/plan.service';
import {AuthService} from '../../../../core/auth/services/auth.service';
import {PlanSearchOutput} from '../../utils/plan-search-output';
import {PlanInfoComponent} from '../plan-info/plan-info.component';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-plan-search-public-mine',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    PlanInfoComponent,
    NgClass
  ],
  templateUrl: './plan-search-mine.component.html',
  styleUrls: [
    './plan-search-mine.component.css',
    '../../../../shared/styles/plan-table.css',
  ],
})
export class PlanSearchMineComponent implements OnInit{
  plans: PlanSearchOutput[] = [];
  selectedPlan: any;

  constructor(private _planService: PlanService, private _authService: AuthService) {
  }

  ngOnInit() {
    this._planService.getPlansByUserId(this._authService.getId()).subscribe({
      next: (plans) => {
        this.plans = plans.plans;
      },
      error: (error) => {
        alert(error.message);
      }
    });
  }

  showPlanInfo(planId: number) {
    this.selectedPlan = this.plans.find(plan => plan.id === planId);
  }
}
