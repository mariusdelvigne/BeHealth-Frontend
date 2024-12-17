import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PlanService} from '../../services/plan.service';
import {NgClass} from '@angular/common';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-food-plans-table',
  standalone: true,
  imports: [
    NgClass,
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

  constructor(private _planService: PlanService) {
  }

  ngOnInit() {
    this._planService.getPlansFiltered('public','','food').subscribe({
      next: (response) => {
        this.foodPlans = response.plans;
      },
      error: (error) => {
        alert(error.message);
      }
    })

    // Show the plan already selected (Used in update form)
    if (this.program && this.program.foodPlanId != null) {
      this._planService.getPlanById(this.program.foodPlanId)
        .subscribe({
          next: (plan) => {
            this.selectedFoodPlan = plan;
            this.emitFoodPlan.emit(plan);
          }
        });
    }
  }

  selectPlan(plan: any) {
    this.selectedFoodPlan = plan;
    this.emitFoodPlan.emit(plan);
  }

  isSelected(foodPlan: any) {
    return this.selectedFoodPlan && this.selectedFoodPlan.id == foodPlan.id;
  }

  emitSearchPlan() {
    this._planService.getPlansFiltered(
      'public', this.form.value.name, 'food')
      .subscribe({
        next: (response) => {
          this.foodPlans = response.plans;
          console.log(response.plans);
        }
      });
  }

  setVisibility(): void {
    this.isVisible = !this.isVisible;
  }
}
