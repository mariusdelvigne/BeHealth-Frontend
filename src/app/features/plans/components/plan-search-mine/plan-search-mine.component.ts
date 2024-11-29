import {Component, OnInit} from '@angular/core';
import {ReactiveFormsModule} from "@angular/forms";
import {PlanService} from '../../services/plan.service';
import {AuthService} from '../../../../core/auth/services/auth.service';
import {PlanSearchOutput} from '../../utils/plan-search-output';
import {PlanInfoComponent} from '../../shared/plan-info/plan-info.component';
import {NgClass} from '@angular/common';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

@Component({
  selector: 'app-plan-search-public-mine',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    PlanInfoComponent,
    NgClass,
  ],
  templateUrl: './plan-search-mine.component.html',
  styleUrls: [
    './plan-search-mine.component.css',
    '../../../../shared/styles/style.css',
  ],
})
export class PlanSearchMineComponent implements OnInit{
  plans: PlanSearchOutput[] = [];
  selectedPlan: any;

  constructor(private _planService: PlanService, private _authService: AuthService, private _toastrService: ToastrService, private _router: Router) {
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
    if (this.selectedPlan?.id == planId) {
      this.selectedPlan = null;
    }
    else {
      this.selectedPlan = null;
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

  goToUpdateForm(planId: number) {
    this._router.navigate(['plan-update', planId]);
  }
}
