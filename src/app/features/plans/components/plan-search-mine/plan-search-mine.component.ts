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
    './plan-search-mine.component.scss',
  ],
})
export class PlanSearchMineComponent implements OnInit{
  plans: PlanSearchOutput[] = [];
  tags: any[] = [];
  selectedPlan: any;
  pageNumber = 1;

  constructor(private _planService: PlanService, private _authService: AuthService, private _toastrService: ToastrService, private _router: Router) {
  }

  ngOnInit() {
    this.loadData();
  }

  showPlanInfo(planId: number) {
    console.log("fezb");
    if (this.selectedPlan?.id == planId) {
      this.selectedPlan = null;
      this.tags = [];
    }
    else {
      this.selectedPlan = null;
      this.tags = [];
      this.selectedPlan = this.plans.find(plan => plan.id === planId);
      this.loadTags(planId);
    }
  }

  deletePlan(event: Event, planId: number) {
    event.stopPropagation();
    if (confirm("Are you sure you want to delete this plan?")) {
      this._planService.deletePlan(this._authService.getId(), planId).subscribe({
        next: () => {
          this.plans = this.plans.filter(p => p.id !== planId);
          this._toastrService.success("Plan deleted successfully.");
        },
        error: (error) => {
          this._toastrService.error("Error deleting plan: " + error.message);
        }
      });
    };
  }

  goToUpdateForm(planId: number) {
    this._router.navigate(['plan-update', planId]);
  }

  loadTags(planId: number) {
    this._planService.getTags(planId).subscribe({
      next: (response) => {
        console.log(response);
        this.tags = response.astPlansTags;
      },
      error: (error) => {
        alert(error.message);
      }
    });
  }

  previousPage() {
    this.pageNumber--;
    this.loadData();
  }

  nextPage() {
    this.pageNumber++;
    this.loadData();
  }

  loadData() {
    this._planService.getPlansByUserId(this._authService.getId(), this.pageNumber - 1).subscribe({
      next: (plans) => {
        this.plans = plans.plans;
      },
      error: (error) => {
        this._toastrService.error("Error searching plans: " + error.message);
      }
    });
  }
}
