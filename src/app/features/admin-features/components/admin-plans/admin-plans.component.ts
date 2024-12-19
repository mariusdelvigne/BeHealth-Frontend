import {Component, OnInit} from '@angular/core';
import {PlanService} from '../../../plans/services/plan.service';
import {ToastrService} from 'ngx-toastr';
import {PlanSearchOutput} from '../../../plans/utils/plan-search-output';
import {UserService} from '../../../../shared/services/user.service';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-admin-plans',
  standalone: true,
  imports: [
    DatePipe
  ],
  templateUrl: './admin-plans.component.html',
  styleUrl: './admin-plans.component.scss'
})
export class AdminPlansComponent implements OnInit {
  plans: PlanSearchOutput[] = [];

  constructor(private _planService: PlanService, private _toastrService: ToastrService, private _userService: UserService) {
  }

  ngOnInit() {
    this._planService.getPlansFiltered().subscribe({
      next: results => {
        this.plans = results.plans;
        this.plans.forEach((plan, index) => {
          this.getCreatorName(plan, index);
        })
      },
      error: err => {
        this._toastrService.error(err.message);
      }
    })
  }

  private getCreatorName(plan: PlanSearchOutput, index: number) {
    const creatorId = plan.creatorId;
    this._userService.getById(creatorId).subscribe({
      next: (user) => {
        this.plans[index].creatorName = user.username;
      },
      error: (error) => {
        this._toastrService.error("Error : " + error.message);
      }
    });
  }

  deletePlan(plan: PlanSearchOutput) {
    const creatorId = plan.creatorId;
    const planId = plan.id;
    const isConfirmed = window.confirm('Are you sure you want to delete this plans ?');

    if (isConfirmed) {
      this._planService.deletePlan(creatorId, planId).subscribe(
        () => {
          window.location.reload();
        },
        (error) => {
          this._toastrService.error(error);
        }
      );
    }
  }
}
