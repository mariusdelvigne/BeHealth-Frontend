import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TimePipe} from '../../../../../../shared/utils/time.pipe';

@Component({
  selector: 'app-plan-sport-list',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    TimePipe,
  ],
  templateUrl: './plan-sport-list.component.html',
  styleUrl: './plan-sport-list.component.scss'
})
export class PlanSportListComponent {
  @Input()
  planSports: any[] = [];

  @Input()
  isEditMode: boolean = false;

  deletePlanSport(index: number) {
    this.planSports.splice(index, 1);
  }
}
