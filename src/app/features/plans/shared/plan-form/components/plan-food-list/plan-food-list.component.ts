import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-plan-food-list',
  standalone: true,
  imports: [],
  templateUrl: './plan-food-list.component.html',
  styleUrl: './plan-food-list.component.scss'
})
export class PlanFoodListComponent {
  @Input()
  planFoods: any[] = [];

  deletePlanFood(index: number) {
    this.planFoods.splice(index, 1);
  }
}
