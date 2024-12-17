import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {PlanService} from '../../services/plan.service';
import {AuthService} from '../../../../core/auth/services/auth.service';
import {ToastrService} from 'ngx-toastr';
import {debounceTime} from 'rxjs';
import {PlanSportListComponent} from './components/plan-sport-list/plan-sport-list.component';
import {PlanSportCreateComponent} from './components/plan-sport-create/plan-sport-create.component';
import {PlanFoodListComponent} from './components/plan-food-list/plan-food-list.component';
import {PlanFoodCreateComponent} from './components/plan-food-create/plan-food-create.component';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-plan-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    PlanSportListComponent,
    PlanSportCreateComponent,
    PlanFoodListComponent,
    PlanFoodCreateComponent,
    NgClass,
  ],
  templateUrl: './plan-form.component.html',
  styleUrls: [
    './plan-form.component.scss',
  ],
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
  planFoods: any[] = [];

  tags: any [] = [];
  tagsList: {id: number, name: string} [] = [];
  tagIdCounter = 0;
  tagNames: string[] = [];

  constructor(private _planService: PlanService, private _authService: AuthService, private _toastrService: ToastrService) { }

  ngOnInit() {
    this._planService.getPlanById(this.planId).subscribe( {
      next: (plan) => {
        this.plan = plan;

        this.form.patchValue({
          name: this.plan.name,
          privacy: this.plan.privacy,
          category: this.plan.category,
          durationInDays: this.plan.durationInDays,
          description: this.plan.description,
          tagInput: '',
          // TODO: Verif
          tagList: this.plan.tagsList,
        });
      }
    });
    this.form.get('name')?.valueChanges
      .pipe(debounceTime(300))
      .subscribe(value => {
        console.log("ok")
        this.updateTagList(value);
      });
  }

  submit() {
    if (this.mode == "create") {
      // TODO Change tagNames when implemented
      this._planService.create({...this.form.value, tagNames: this.tagNames}, this._authService.getId()).subscribe({
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

  addPlanSport(planSport: any) {
    let pos: number = this.planSports.findIndex(s => s.dayNumber > planSport.dayNumber ||
      (s.dayNumber == planSport.dayNumber && s.dayTime > planSport.dayTime));
    pos = (pos !== -1 ? pos : this.planSports.length);

    this.planSports.splice(pos, 0, planSport);
  }

  addPlanFood(planFood: any) {
    let pos: number = this.planFoods.findIndex(f => f.dayNumber > planFood.dayNumber ||
      (f.dayNumber == planFood.dayNumber && f.dayTime > planFood.dayTime));
    pos = (pos !== -1 ? pos : this.planFoods.length);

    this.planFoods.splice(pos, 0, planFood);
  }

  updateTagList(name: string) {
    this._planService.getAllTagsStartingWith(name)
      .subscribe({
        next: response => this.tags = response.tags,
      })
  }

  addTag(tagInput: HTMLInputElement) {
    const tag = tagInput.value;
    if (tag && !this.tagsList.find(t => t.name === tag)) {
      this.tagsList.push({ id: this.tagIdCounter++, name: tag });
      this.tagNames.push(tag)
      tagInput.value = '';
    }
  }

  removeTag(tag: any) {
    this.tagsList = this.tagsList.filter(t => t.id !== tag.id);
  }

  setPrivacy() {
    this.form.get('privacy')?.setValue(this.form.get('privacy')?.value === 'private' ? 'public' : 'private');
  }
}
