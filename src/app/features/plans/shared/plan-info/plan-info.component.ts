import {Component, Input} from '@angular/core';
import {PlanSportListComponent} from '../plan-form/components/plan-sport-list/plan-sport-list.component';
import {PlanFoodListComponent} from '../plan-form/components/plan-food-list/plan-food-list.component';

@Component({
  selector: 'app-plan-info',
  standalone: true,
  imports: [
    PlanSportListComponent,
    PlanFoodListComponent
  ],
  templateUrl: './plan-info.component.html',
  styleUrls: [
    './plan-info.component.scss',
  ]
})
export class PlanInfoComponent {
  @Input() plan: any;
}
