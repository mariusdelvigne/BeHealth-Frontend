import {Component, Input, OnInit} from '@angular/core';
import {PlanSearchOutput} from '../../utils/plan-search-output';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {PlanService} from '../../services/plan.service';
import {AuthService} from '../../../../core/auth/services/auth.service';
import {ToastrService} from "ngx-toastr";

@Component({
    selector: 'app-plan-update-form',
    standalone: true,
    imports: [
        ReactiveFormsModule
    ],
    templateUrl: './plan-update-form.component.html',
    styleUrl: './plan-update-form.component.css'
})
export class PlanUpdateFormComponent implements OnInit {
    @Input() plan: any;
    form: FormGroup = new FormGroup({
        name: new FormControl('', [Validators.required, Validators.minLength(3)]),
        privacy: new FormControl('', Validators.required),
        category: new FormControl('', Validators.required),
        durationInDays: new FormControl('', [Validators.required, Validators.min(1)]),
        description: new FormControl('', [Validators.required, Validators.min(1)])
    });

    constructor(private _planService: PlanService, private _authService: AuthService, private _toastrService: ToastrService) {
    }

    ngOnInit() {
        this.form.patchValue({
            name: this.plan.name,
            privacy: this.plan.privacy,
            category: this.plan.category,
            durationInDays: this.plan.durationInDays,
            description: this.plan.description
        });
    }

    updatePlan() {
        this._planService.updatePlan(this._authService.getId(), this.plan.id, this.form.value).subscribe({
            next: () => {
                this._toastrService.success("Plan updated successfully");
            },
            error: (error) => {
                this._toastrService.error("Error updating the plan : " + error.message);
            }
        })
    }
}
