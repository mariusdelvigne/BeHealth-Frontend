import {Component, OnInit} from '@angular/core';
import {PlanFormComponent} from "../../shared/plan-form/plan-form.component";
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-plan-update',
  standalone: true,
    imports: [
        PlanFormComponent
    ],
  templateUrl: './plan-update.component.html',
  styleUrl: './plan-update.component.scss'
})
export class PlanUpdateComponent implements OnInit {
  mode: string = 'update';
  planId!: number;

  constructor(private _route: ActivatedRoute) {
  }

  ngOnInit() {
    this.planId = this._route.snapshot.params['id'];
  }
}
