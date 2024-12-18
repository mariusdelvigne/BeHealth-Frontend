import {Component, Input} from '@angular/core';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-plan-sleep-element',
  standalone: true,
  imports: [
    DatePipe
  ],
  templateUrl: './plan-sleep-element.component.html',
  styleUrl: './plan-sleep-element.component.scss'
})
export class PlanSleepElementComponent {
  @Input()
  planSleep: any = null;
}
