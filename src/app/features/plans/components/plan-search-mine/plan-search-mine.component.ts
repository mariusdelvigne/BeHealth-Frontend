import {Component, OnInit} from '@angular/core';
import {ReactiveFormsModule} from "@angular/forms";
import {PlanService} from '../../services/plan.service';
import {AuthService} from '../../../../core/auth/services/auth.service';
import {PlanSearchOutput} from '../../utils/plan-search-output';
import {PlanInfoComponent} from '../plan-info/plan-info.component';
import {NgClass} from '@angular/common';
import {ToastrService} from 'ngx-toastr';
import {PlanUpdateFormComponent} from "../plan-update-form/plan-update-form.component";

@Component({
  selector: 'app-plan-search-public-mine',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    PlanInfoComponent,
    NgClass,
    PlanUpdateFormComponent
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
  selectedUpdatePlan: any;

  constructor(private _planService: PlanService, private _authService: AuthService, private _toastrService: ToastrService) {
  }

  ngOnInit() {
    this._planService.getPlansByUserId(this._authService.getId()).subscribe({
      next: (plans) => {
        this.plans = plans.plans;
      },
      error: (error) => {
        this._toastrService.error("Error searching plans: " + error.message);
      }
    });
  }

  showPlanInfo(planId: number) {
    if (this.selectedPlan != null) {
      this.selectedPlan = null;
    }
    else {
      this.selectedUpdatePlan = null;
      this.selectedPlan = this.plans.find(plan => plan.id === planId);
    }
  }

  deletePlan(planId: number) {
    this._planService.deletePlan(this._authService.getId(), planId).subscribe({
      next: () => {
        this._toastrService.success("Plan deleted successfully.");
      },
      error: (error) => {
        this._toastrService.error("Error deleting plan: " + error.message);
      }
    });
  }

  showUpdateForm(planId: number) {
    if (this.selectedUpdatePlan != null) {
      this.selectedUpdatePlan = null;
    }
    else {
      this.selectedPlan = null;
      this.selectedUpdatePlan = this.plans.find(plan => plan.id === planId);
    }
  }
}
