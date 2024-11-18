import {Component, OnInit} from '@angular/core';
import {PlanService} from '../../../../plans/services/plan.service';

@Component({
  selector: 'app-sport-plans-table',
  standalone: true,
  imports: [],
  templateUrl: './sport-plans-table.component.html',
  styleUrl: './sport-plans-table.component.css'
})
export class SportPlansTableComponent implements OnInit{
  sportPlans: any;

  constructor(private _planService: PlanService) {
  }

  ngOnInit() {
    this._planService.getPlansFiltered('','','sport').subscribe({
      next: (response) => {
        this.sportPlans = response.plans;
      },
      error: (error) => {
        alert(error.message);
      }
    })
  }
}
