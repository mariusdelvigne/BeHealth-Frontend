import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PlanService} from '../../services/plan.service';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-food-plans-table',
  standalone: true,
  imports: [
    ReactiveFormsModule,
  ],
  templateUrl: './food-plans-table.component.html',
  styleUrls: [
    './food-plans-table.component.scss',
  ]
})
export class FoodPlansTableComponent implements OnInit {
  isVisible: boolean = true;
  foodPlans: any;
  selectedFoodPlan: any;
  @Input() program!: any;
  @Output() emitFoodPlan = new EventEmitter();
  form: FormGroup = new FormGroup({
    name: new FormControl(''),
  });
  pageNumber = 1;

  constructor(private _planService: PlanService) {
  }

  ngOnInit() {
    this.loadData();
  }

  selectPlan(plan: any) {
    this.selectedFoodPlan = plan;
    this.emitFoodPlan.emit(plan);
  }

  emitSearchPlan() {
    this._planService.getPlansFiltered(
      'public', this.form.value.name, 'food')
      .subscribe({
        next: (response) => {
          this.foodPlans = response.plans;
        }
      });
  }

  setVisibility(): void {
    this.isVisible = !this.isVisible;
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
    this._planService.getPlansFiltered('public','','food', this.pageNumber - 1).subscribe({
      next: (response) => {
        this.foodPlans = response.plans;

        // Show the plan already selected
        if (this.program && this.program.foodPlanId != null) {
          this._planService.getPlanById(this.program.foodPlanId)
            .subscribe({
              next: (plan) => {
                this.selectedFoodPlan = plan;
                this.emitFoodPlan.emit(plan);
              }
            });
        }
      },
      error: (error) => {
        alert(error.message);
      }
    })
  }
}
