import {Component, Input} from '@angular/core';
import {TimePipe} from '../../../../../../shared/utils/time.pipe';

@Component({
  selector: 'app-plan-sleep-element',
  standalone: true,
  imports: [
    TimePipe
  ],
  templateUrl: './plan-sleep-element.component.html',
  styleUrl: './plan-sleep-element.component.scss'
})
export class PlanSleepElementComponent {
  @Input()
  planSleep: any = null;
}
