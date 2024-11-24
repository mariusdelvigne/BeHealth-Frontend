import {Component, OnInit} from '@angular/core';
import {ReactiveFormsModule} from "@angular/forms";
import {PlanService} from '../../services/plan.service';
import {AuthService} from '../../../../core/auth/services/auth.service';
import {PlanSearchOutput} from '../../utils/plan-search-output';
import {PlanInfoComponent} from '../plan-info/plan-info.component';
import {NgClass} from '@angular/common';
import {ToastrService} from 'ngx-toastr';

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

  constructor(private _planService: PlanService, private _authService: AuthService, private toastrService: ToastrService) {
  }

  ngOnInit() {
    this._planService.getPlansByUserId(this._authService.getId()).subscribe({
      next: (plans) => {
        this.plans = plans.plans;
      },
      error: (error) => {
        this.toastrService.error("Error searching plans: " + error.message);
      }
    });
  }

  showPlanInfo(planId: number) {
    this.selectedPlan = this.plans.find(plan => plan.id === planId);
  }

  deletePlan(planId: number) {
    this._planService.deletePlan(this._authService.getId(), planId).subscribe({
      next: () => {
        this.toastrService.success("Plan deleted successfully.");
      },
      error: (error) => {
        this.toastrService.error("Error deleting plan: " + error.message);
      }
    });
  }
}
