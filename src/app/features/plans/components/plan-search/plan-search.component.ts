import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {PlanSearchOutput} from '../../utils/plan-search-output';
import {PlanService} from '../../services/plan.service';
import {AuthService} from '../../../../core/auth/services/auth.service';

@Component({
  selector: 'app-plan-search',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './plan-search.component.html',
  styleUrl: './plan-search.component.css'
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
}
