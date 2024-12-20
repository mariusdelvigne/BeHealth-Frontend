import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PlanService} from '../../services/plan.service';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
    selector: 'app-sleep-plans-table',
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule
    ],
    templateUrl: './sleep-plans-table.component.html',
    styleUrls: [
        './sleep-plans-table.component.scss',
    ]
})
export class SleepPlansTableComponent implements OnInit {
    isVisible: boolean = true;
    sleepPlans: any;
    selectedSleepPlan: any;
    @Input() program!: any;
    @Output() emitSleepPlan = new EventEmitter();
    form: FormGroup = new FormGroup({
        name: new FormControl(''),
    });
    pageNumber = 1;

    constructor(private _planService: PlanService) {
    }

    ngOnInit() {
        this.loadData();
    }

    selectPlan(plan: any) {
        this.selectedSleepPlan = plan;
        this.emitSleepPlan.emit(plan);
    }

    emitSearchPlan() {
        this._planService.getPlansFiltered(
            'public', this.form.value.name, 'sleep')
            .subscribe({
                next: (response) => {
                    this.sleepPlans = response.plans;
                }
            });
    }

    setVisibility(): void {
        this.isVisible = !this.isVisible;
    }

    previousPage() {
        this.pageNumber--;
        this.loadData();
    }

    nextPage() {
        this.pageNumber++;
        this.loadData();
    }

    loadData() {
        this._planService.getPlansFiltered('public', '', 'sleep', this.pageNumber - 1).subscribe({
            next: (response) => {
                this.sleepPlans = response.plans;

                // Show the plan already selected
                if (this.program && this.program.sleepPlanId != null) {
                    this._planService.getPlanById(this.program.sleepPlanId)
                        .subscribe({
                            next: (plan) => {
                                this.selectedSleepPlan = plan;
                                this.emitSleepPlan.emit(plan);
                            }
                        });
                }
            },
            error: (error) => {
                alert(error.message);
            }
        });
    }
}
