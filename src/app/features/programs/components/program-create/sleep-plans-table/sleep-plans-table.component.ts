import {Component, OnInit} from '@angular/core';
import {PlanService} from '../../../../plans/services/plan.service';

@Component({
  selector: 'app-sleep-plans-table',
  standalone: true,
  imports: [],
  templateUrl: './sleep-plans-table.component.html',
  styleUrl: './sleep-plans-table.component.css'
})
export class SleepPlansTableComponent implements OnInit{
  sleepPlans: any;

  constructor(private _planService: PlanService) {
  }

  ngOnInit() {
    this._planService.getPlansFiltered('','','sleep').subscribe({
      next: (response) => {
        this.sleepPlans = response.plans;
      },
      error: (error) => {
        alert(error.message);
      }
    })
  }
}
