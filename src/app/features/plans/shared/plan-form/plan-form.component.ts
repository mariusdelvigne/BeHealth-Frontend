import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {PlanService} from '../../services/plan.service';
import {AuthService} from '../../../../core/auth/services/auth.service';
import {ToastrService} from 'ngx-toastr';
import {debounceTime, firstValueFrom} from 'rxjs';
import {PlanSportListComponent} from './components/plan-sport-list/plan-sport-list.component';
import {PlanSportCreateComponent} from './components/plan-sport-create/plan-sport-create.component';
import {PlanFoodListComponent} from './components/plan-food-list/plan-food-list.component';
import {PlanFoodCreateComponent} from './components/plan-food-create/plan-food-create.component';
import {NgClass} from '@angular/common';
import {PlanSleepFormComponent} from './components/plan-sleep-form/plan-sleep-form.component';

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
    PlanSleepFormComponent,
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
    description: new FormControl('', [Validators.required, Validators.min(1)]),
    tagInput: new FormControl(''),
  });

  planSports: any[] = [];
  planFoods: any[] = [];
  planSleep: any = {
    startTime: '',
    durationInMin: 0,
  };

  tags: any [] = [];
  planTags: {id: number, name: string} [] = [];
  tagIdCounter = 0;
  tagNames: string[] = [];

  constructor(private _planService: PlanService, private _authService: AuthService, private _toastrService: ToastrService) { }

  ngOnInit() {
    if (this.mode === 'update')
      this.form.get('category')?.disable();

    this.loadPlan();
    this.form.get('tagInput')?.valueChanges
      .pipe(debounceTime(300))
      .subscribe(value => {
        this.updateTagList(value);
      });
  }

  async loadPlan() {
    this.plan = await firstValueFrom(this._planService.getPlanById(this.planId));
    var response = await firstValueFrom(this._planService.getTags(this.planId));
    if (response && response.astPlansTags) {
      this.planTags = response.astPlansTags.map((tagObj: any) => tagObj.tag);
    }

    this.form.patchValue({
      name: this.plan.name,
      privacy: this.plan.privacy,
      category: this.plan.category,
      durationInDays: this.plan.durationInDays,
      description: this.plan.description,
      planTags: this.planTags,
    });

    const pageSize = 20;
    let pageNumber = 0;
    let fetchQuantity: number = 0;

    if (this.plan.category === 'sleep') {
      const planContent = await firstValueFrom(this._planService.getContent(this.planId, 0, 10));
      this.planSleep = {...planContent.sleep, startTime: planContent.sleep.startTime.substring(0, 5)};
      return;
    }

    do {
      const planContent = await firstValueFrom(this._planService.getContent(this.planId, pageNumber++, pageSize));

      if (this.plan.category === 'sport') {
        fetchQuantity = planContent.sports.length;
        this.planSports.push(...planContent.sports.map((sport: any) => ({
          ...sport, dayTime: sport.dayTime.substring(0, 5),
        })));
      } else if (this.plan.category === 'food') {
        fetchQuantity = planContent.foods.length;
        this.planFoods.push(...planContent.foods.map((food: any) => ({
          ...food, dayTime: food.dayTime.substring(0, 5),
        })));
      }
    } while (fetchQuantity === pageSize);
  }

  async submit() {
    try {
      if (this.mode == "create") {
        const response = await firstValueFrom(this._planService.create({
          ...this.form.value,
          tagNames: this.tagNames
        }, this._authService.getId()));
        this.planId = response.id;
        this._toastrService.success("Plan created successfully");
      } else if (this.mode == "update") {
        await firstValueFrom(this._planService.updatePlan(
          this._authService.getId(),
          this.plan.id,
          this.form.value));
        this._toastrService.success("Plan updated successfully");
      }
    } catch (error: any) {
      this.mode == "create"
      ? this._toastrService.error("Error creating the plan : " + error.message)
      : this._toastrService.error("Error updating the plan : " + error.message);
      return;
    }

    try {
      if (this.form.getRawValue().category === 'sport') {
        const sports = this.planSports.map(sport => ({...sport, dayTime: sport.dayTime + ":00"}));
        await firstValueFrom(this._planService.updatePlanSports(this._authService.getId(), this.planId, {sports}));
      } else if (this.form.getRawValue().category === 'food') {
        const foods = this.planFoods.map(food => ({...food, dayTime: food.dayTime + ":00"}));
        await firstValueFrom(this._planService.updatePlanFoods(this._authService.getId(), this.planId, {foods}));
      } else {
        const sleep = {...this.planSleep, startTime: this.planSleep.startTime + ":00"};
        await firstValueFrom(this._planService.updatePlanSleep(this._authService.getId(), this.planId, {sleep}));
      }

      this._toastrService.success("Data added successfully");

      if (this.mode == "create") {
        window.location.reload();
      }
    } catch (error: any) {
      this._toastrService.error("Error adding content");
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
    if (tag && !this.planTags.find(t => t.name === tag)) {
      this.planTags.push({ id: this.tagIdCounter++, name: tag });
      this.tagNames.push(tag)
      tagInput.value = '';
    }
  }

  removeTag(tag: any) {
    this.planTags = this.planTags.filter(t => t.id !== tag.id);
  }

  setPrivacy() {
    this.form.get('privacy')?.setValue(this.form.get('privacy')?.value === 'private' ? 'public' : 'private');
  }

  get planRawCategory() {
    return this.form.getRawValue().category;
  }
}
