import {Component, OnInit} from '@angular/core';
import {ProgramService} from '../../../services/program.service';
import {AuthService} from '../../../../../core/auth/services/auth.service';
import {FoodService} from '../../../../../shared/services/food.service';
import {PlanService} from '../../../../plans/services/plan.service';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-food-plans-table',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './food-plans-table.component.html',
  styleUrls: [
    './food-plans-table.component.css',
    '../../../../../shared/styles/plan-table.css'
  ]
})
export class FoodPlansTableComponent implements OnInit {
  foodPlans: any;
  selectedPlans: any[] = [];

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

  showTooltip(event: MouseEvent, text: string): void {
    const tooltip = document.getElementById('tooltip');
    if (tooltip) {
      tooltip.innerText = "description : " + text;

      // Lay the tooltip near the cursor
      tooltip.style.left = `${event.pageX}px`;
      tooltip.style.top = `${event.pageY - 10}px`;

      tooltip.hidden = false;
    }
  }

  hideTooltip(): void {
    const tooltip = document.getElementById('tooltip');
    if (tooltip) {
      tooltip.hidden = true;
    }
  }

  selectPlan(plan: any) {
    const index = this.selectedPlans.indexOf(plan);
    if (index == -1) {
      this.selectedPlans.push(plan);

    } else {
      this.selectedPlans.splice(index, 1);
    }
  }

  isSelected(sportPlan: any) {
    return this.selectedPlans.includes(sportPlan);
  }
}
