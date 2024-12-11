import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PlanSearchOutput} from '../../utils/plan-search-output';
import {PlanService} from '../../services/plan.service';
import {PlanInfoComponent} from '../../shared/plan-info/plan-info.component';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-plan-search-public',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    PlanInfoComponent,
    NgClass
  ],
  templateUrl: './plan-search-public.component.html',
  styleUrls: [
    './plan-search-public.component.scss',
  ],
})
export class PlanSearchPublicComponent implements OnInit {
  plans: PlanSearchOutput[] = [];
  tags: any[] = [];
  form: FormGroup = new FormGroup({
    name: new FormControl(''),
    category: new FormControl(''),
  });
  selectedPlan: any;

  constructor(private _planService: PlanService) {
  }

  ngOnInit() {
    this._planService.getPlansFiltered("public").subscribe({
      next: (plans) => {
        this.plans = plans.plans;
      },
      error: (error) => {
        alert(error.message);
      }
    });
  }

  emitSearchPlan() {
    this._planService.getPlansFiltered(
      "public", this.form.value.name, this.form.value.category)
      .subscribe(plans => this.plans = plans.plans);
  }

  showPlanInfo(planId: number) {
    if (this.selectedPlan?.id == planId) {
      this.selectedPlan = null;
      this.tags = [];
    }
    else {
      this.selectedPlan = null;
      this.tags = [];
      this.selectedPlan = this.plans.find(plan => plan.id === planId);
      this.loadTags(planId)
    }
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

    get colorChange() {
    return this.form.invalid ? 'grey' : 'blue';
  }
}
