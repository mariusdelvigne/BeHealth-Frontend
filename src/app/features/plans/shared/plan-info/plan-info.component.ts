import {Component, Input, OnInit} from '@angular/core';
import {PlanSportListComponent} from '../plan-form/components/plan-sport-list/plan-sport-list.component';
import {PlanFoodListComponent} from '../plan-form/components/plan-food-list/plan-food-list.component';
import {PlanService} from '../../services/plan.service';
import {PlanSleepFormComponent} from '../plan-form/components/plan-sleep-form/plan-sleep-form.component';
import {PlanSleepElementComponent} from '../plan-form/components/plan-sleep-element/plan-sleep-element.component';

@Component({
  selector: 'app-plan-info',
  standalone: true,
  imports: [
    PlanSportListComponent,
    PlanFoodListComponent,
    PlanSleepElementComponent
  ],
  templateUrl: './plan-info.component.html',
  styleUrls: [
    './plan-info.component.scss',
  ]
})
export class PlanInfoComponent implements OnInit {
  @Input() plan: any;
  @Input() tags: any[] = [];
  pageNumber: number = 0;
  contentLeft: boolean = false;

  constructor(private _planService: PlanService) { }

  ngOnInit() {
    this.loadContent(null);
  }

  loadContent(e: Event | null) {
    e?.stopImmediatePropagation();
    const pageSize: number = 20;
    this._planService.getContent(this.plan.id, this.pageNumber++, pageSize).subscribe({
      next: (response) => {
        if (this.plan.category === 'sleep') {
          this.plan.sleep = response.sleep;
          return;
        }

        if (this.plan.category === 'sport') {
          if (response.sports.length < pageSize)
            this.contentLeft = false;

          if (this.plan.sports)
            this.plan.sports.splice(this.plan.sports.length, 0, ...response.sports);
        } else if (this.plan.category === 'food') {
          if (response.foods.length < pageSize)
            this.contentLeft = false;

          if (this.plan.foods)
            this.plan.foods.splice(this.plan.foods.length, 0, ...response.foods);
        }
      },
      error: (error) => {
        alert(error.message);
      }
    });
  }
}
