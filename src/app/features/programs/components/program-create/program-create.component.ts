import {Component} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {FoodPlansTableComponent} from '../../../plans/shared/food-plans-table/food-plans-table.component';
import {SportPlansTableComponent} from '../../../plans/shared/sport-plans-table/sport-plans-table.component';
import {SleepPlansTableComponent} from '../../../plans/shared/sleep-plans-table/sleep-plans-table.component';
import {ProgramFormComponent} from '../../shared/program-form/program-form.component';

@Component({
  selector: 'app-program-create',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FoodPlansTableComponent,
    SportPlansTableComponent,
    SleepPlansTableComponent,
    ProgramFormComponent
  ],
  templateUrl: './program-create.component.html',
  styleUrl: './program-create.component.css'
})
export class ProgramCreateComponent {
  mode: string = 'create';
}
