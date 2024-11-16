import {Component, OnInit} from '@angular/core';
import {ReactiveFormsModule} from "@angular/forms";
import {PlanService} from '../../services/plan.service';
import {AuthService} from '../../../../core/auth/services/auth.service';
import {PlanSearchOutput} from '../../utils/plan-search-output';

@Component({
  selector: 'app-plan-search-public-mine',
  standalone: true,
    imports: [
        ReactiveFormsModule
    ],
  templateUrl: './plan-search-private.component.html',
  styleUrl: './plan-search-private.component.css'
})
export class PlanSearchPrivateComponent implements OnInit{
  plans: PlanSearchOutput[] = [];

  constructor(private _planService: PlanService, private _authService: AuthService) {
  }

  ngOnInit() {
    this._planService.getPlansByUserId(this._authService.getId()).subscribe({
      next: (plans) => {
        this.plans = plans.plans;
      },
      error: (error) => {
        alert(error.message);
      }
    });
  }
}
