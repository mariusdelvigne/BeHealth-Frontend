import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PlanSearchOutput} from '../../utils/plan-search-output';
import {PlanService} from '../../services/plan.service';
import {PlanInfoComponent} from '../../shared/plan-info/plan-info.component';
import {NgClass} from '@angular/common';
import {DebounceService} from '../../../../shared/services/debounce.service';

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
  selectedPlan: any = null;
  pageNumber = 1;

  constructor(private _planService: PlanService, private _debounceService: DebounceService) {
  }

  ngOnInit() {
    this.loadData();
  }

  emitSearchPlan() {
    this._planService.getPlansFiltered(
      "public", this.form.value.name, this.form.value.category, this.pageNumber - 1)
      .subscribe(response => {
        this.plans = response.plans;
      });
  }

  loadData() {
    this.emitSearchPlan();
    this._debounceService.debounce(() => {
      this._planService.getPlansFiltered('public', '', '', this.pageNumber - 1).subscribe({
        next: (plans) => {
          this.plans = plans.plans;
        },
        error: (error) => {
          alert(error.message);
        }
      });
    }, 500);
  }


  showPlanInfo(planId: number) {
    this.tags = [];
    if (this.selectedPlan?.id == planId) {
      this.selectedPlan = null;
    } else {
      this.selectedPlan = null;
      this.selectedPlan = this.plans.find(plan => plan.id === planId);
      this.loadTags(planId);
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

  previousPage() {
    this.pageNumber--;
    this.loadData();
  }

  nextPage() {
    this.pageNumber++;
    this.loadData();
  }
}
