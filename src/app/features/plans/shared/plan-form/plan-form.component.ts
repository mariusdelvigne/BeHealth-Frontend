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
    description: new FormControl('', [Validators.required, Validators.min(1)]),
    tagInput: new FormControl(''),
  });

  planSports: any[] = [];
  planFoods: any[] = [];

  tags: any [] = [];
  tagsList: {id: number, name: string} [] = [];
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
        console.log("ok")
        this.updateTagList(value);
      });
  }

  async loadPlan() {
    this.plan = await firstValueFrom(this._planService.getPlanById(this.planId));
    this.form.patchValue({
      name: this.plan.name,
      privacy: this.plan.privacy,
      category: this.plan.category,
      durationInDays: this.plan.durationInDays,
      description: this.plan.description,
    });


    const pageSize = 20;
    let pageNumber = 0;
    let fetchQuantity: number = 0;

    do {
      const planContent = await firstValueFrom(this._planService.getContent(this.planId, pageNumber++, pageSize));

      if (this.plan.category === 'sport') {
        fetchQuantity = planContent.sports.length;
        this.planSports.push(...planContent.sports);
      } else if (this.plan.category === 'food') {
        fetchQuantity = planContent.foods.length;
        this.planFoods.push(...planContent.foods);
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
        const {command, category} = this.form.value;
        await firstValueFrom(this._planService.updatePlan(
          this._authService.getId(),
          this.plan.id,
          command));
        this._toastrService.success("Plan updated successfully");
      }
    } catch (error: any) {
      this._toastrService.error("Error creating the plan : " + error.message);
    }

    try {
      if (this.form.value.category === 'sport') {
        const sports = this.planSports.map(sport => ({...sport, dayTime: sport.dayTime + ":00"}));
        await firstValueFrom(this._planService.updatePlanSports(this._authService.getId(), this.planId, {sports}));
      } else if (this.form.value.category === 'food') {
        const foods = this.planFoods.map(food => ({...food, dayTime: food.dayTime + ":00"}));
        await firstValueFrom(this._planService.updatePlanFoods(this._authService.getId(), this.planId, {foods}));
      }

      this._toastrService.success("Data added successfully");
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
