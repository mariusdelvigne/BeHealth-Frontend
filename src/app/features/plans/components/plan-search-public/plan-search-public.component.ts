import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PlanSearchOutput} from '../../utils/plan-search-output';
import {PlanService} from '../../services/plan.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {
    ProgramInfoComponent
} from "../../../programs/components/program-search-public/program-info/program-info.component";
import {PlanInfoComponent} from '../plan-info/plan-info.component';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-plan-search-public',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ProgramInfoComponent,
    PlanInfoComponent,
    NgClass
  ],
  templateUrl: './plan-search-public.component.html',
  styleUrls: [
    './plan-search-public.component.css',
    '../../../../shared/styles/plan-table.css',
  ],
  animations: [
    trigger('colorChange', [
      state('grey', style({
        backgroundColor: 'rgba(173, 181, 189, 0.3)',
        border: '3px solid rgba(173, 181, 189, 0.5)',
      })),
      state('blue', style({
        backgroundColor: 'rgba(13, 110, 253, 0.3)',
        border: '3px solid rgba(13, 110, 253, 0.5)',
      })),
      transition('grey <=> blue', [
        animate('1s ease-out')
      ])
    ])
  ]
})
export class PlanSearchPublicComponent implements OnInit {
  plans: PlanSearchOutput[] = [];
  form: FormGroup = new FormGroup({
    name: new FormControl(''),
    category: new FormControl(''),
  });
  selectedPlan: any;

  constructor(private _planService: PlanService) {
  }

  ngOnInit() {
      this._planService.getPlansFiltered("public").subscribe({
        next: (plans) => {
          this.plans = plans.plans;
        },
        error: (error) => {
          alert(error.message);
        }
      });
  }

  emitSearchPlan() {
    this._planService.getPlansFiltered(
      "public", this.form.value.name, this.form.value.category)
      .subscribe(plans => this.plans = plans.plans);
  }

  showPlanInfo(planId: number) {
    this.selectedPlan = this.plans.find(plan => plan.id === planId);
  }

  get colorChange() {
    return this.form.invalid ? 'grey' : 'blue';
  }
}
