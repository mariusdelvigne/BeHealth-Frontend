import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {PlanSearchOutput} from '../../utils/plan-search-output';
import {PlanService} from '../../services/plan.service';
import {AuthService} from '../../../../core/auth/services/auth.service';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-plan-search',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './plan-search.component.html',
  styleUrl: './plan-search.component.css',
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
export class PlanSearchComponent implements OnInit {
  plans: PlanSearchOutput[] = [];
  form: FormGroup = new FormGroup({
    name: new FormControl(''),
    category: new FormControl(''),
  });

  constructor(private _planService: PlanService, private _authService: AuthService) {
  }

  ngOnInit() {
      this._planService.getPlansPublicFilter().subscribe({
        next: (plans) => {
          this.plans = plans.plans;
        },
        error: (error) => {
          alert(error.message);
        }
      });
  }

  emitSearchPlan() {
    this._planService.getPlansPublicFilter(
      this.form.value.name, this.form.value.category)
      .subscribe(plans => this.plans = plans.plans);
  }

  get colorChange() {
    return this.form.invalid ? 'grey' : 'blue';
  }
}
