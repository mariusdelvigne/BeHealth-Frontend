import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-plan-info',
  standalone: true,
  imports: [],
  templateUrl: './plan-info.component.html',
  styleUrls: [
    './plan-info.component.css',
    '../../../../shared/styles/plan-table.css',
  ]
})
export class PlanInfoComponent {
  @Input() plan: any;
}
