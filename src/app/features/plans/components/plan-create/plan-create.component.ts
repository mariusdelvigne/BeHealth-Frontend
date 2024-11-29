import {Component} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {PlanFormComponent} from '../../shared/plan-form/plan-form.component';

@Component({
  selector: 'app-plan-create',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    PlanFormComponent,
  ],
  templateUrl: './plan-create.component.html',
  styleUrls: [
    './plan-create.component.css',
    '../../../../shared/styles/style.css',
  ],
})
export class PlanCreateComponent {
  mode: string = 'create';
}
