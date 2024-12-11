import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {PlanService} from '../../services/plan.service';
import {AuthService} from '../../../../core/auth/services/auth.service';
import {ToastrService} from 'ngx-toastr';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {PlanSportListComponent} from './components/plan-sport-list/plan-sport-list.component';
import {PlanSportCreateComponent} from './components/plan-sport-create/plan-sport-create.component';

@Component({
  selector: 'app-plan-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    PlanSportListComponent,
    PlanSportCreateComponent,
  ],
  templateUrl: './plan-form.component.html',
  styleUrls: [
    './plan-form.component.scss',
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
export class PlanFormComponent implements OnInit {
  @Input() mode: string = '';
  @Input() planId!: number;
  plan: any;
  form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    privacy: new FormControl('private', Validators.required),
    category: new FormControl('sport', Validators.required),
    durationInDays: new FormControl('', [Validators.required, Validators.min(1)]),
    description: new FormControl('', [Validators.required, Validators.min(1)])
  });

  planSports: any[] = [];

  constructor(private _planService: PlanService, private _authService: AuthService, private _toastrService: ToastrService) { }

  ngOnInit() {
    this._planService.getPlansById(this.planId).subscribe( {
      next: (plan) => {
        this.plan = plan;

        this.form.patchValue({
          name: this.plan.name,
          privacy: this.plan.privacy,
          category: this.plan.category,
          durationInDays: this.plan.durationInDays,
          description: this.plan.description
        });
      }
    });
  }

  submit() {
    if (this.mode == "create") {
      // TODO Change tagNames when implemented
      this._planService.create({...this.form.value, tagNames: []}, this._authService.getId()).subscribe({
        next: response => {
          this._toastrService.success("Plan created successfully");

          if (this.planCategory === 'sport') {
            // Needed because C# needs TimeSpan in XX:XX:XX format and JS sends it in XX:XX format
            const planSports = this.planSports.map(sport => ({...sport, dayTime: sport.dayTime + ":00"}));

            this._planService.updatePlanSports(this._authService.getId(), response.id, {sports: planSports})
              .subscribe({
                next: response => {
                  this._toastrService.success("Sports added successfully");
                },
                error: () => {
                  this._toastrService.error("Error adding sports");
                }
              });
          }
        },
        error: (error) => {
          this._toastrService.error("Error creating the plan : " + error.message);
        }
      })
    } else if (this.mode == "update") {
      this._planService.updatePlan(this._authService.getId(), this.plan.id, this.form.value).subscribe({
        next: () => {
          this._toastrService.success("Plan updated successfully");
        },
        error: (error) => {
          this._toastrService.error("Error updating the plan : " + error.message);
        }
      });
    }
  }

  get planCategory(): string {
    return this.form.value.category;
  }

  get colorChange() {
    return this.form.invalid ? 'grey' : 'blue';
  }

  createPlanSport(planSport: any) {
    this.planSports.push(planSport);
  }
}
