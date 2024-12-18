import {Component, Input} from '@angular/core';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-plan-sleep-form',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './plan-sleep-form.component.html',
  styleUrl: './plan-sleep-form.component.scss'
})
export class PlanSleepFormComponent {
  @Input()
  planSleep: any = null;
}
