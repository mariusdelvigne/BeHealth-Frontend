import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {PlanService} from '../../services/plan.service';
import {AuthService} from '../../../../core/auth/services/auth.service';
import {ToastrService} from 'ngx-toastr';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {debounceTime, firstValueFrom} from 'rxjs';

@Component({
  selector: 'app-plan-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
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

  tags: {id: number, name: string} [] = [];
  tagsList: {id: number, name: string} [] = [];
  tagIdCounter = 0;
  tagNames: string[] = [];

  constructor(private _planService: PlanService, private _authService: AuthService, private _toastrService: ToastrService) {
  }

  ngOnInit() {
    this._planService.getPlansById(this.planId).subscribe( {
      next: (plan) => {
        this.plan = plan;

        this.form.patchValue({
          name: this.plan.name,
          privacy: this.plan.privacy,
          category: this.plan.category,
          durationInDays: this.plan.durationInDays,
          description: this.plan.description,
          // A VERIF
          tagList: this.plan.tagsList,
        });
      }
    });
    this.form.get('tagInput')?.valueChanges
      .pipe(debounceTime(300))
      .subscribe(value => {
        this.updateTagList(value);
      });
  }

   submit() {
      if(this.mode == "create") {
        this._planService.create({...this.form.value, tagNames: this.tagNames}, this._authService.getId()).subscribe({
          next: (plan) => {
            this._toastrService.success("Plan created successfully");
          },
          error: (error) => {
            this._toastrService.error("Error creating new plan: " + error.message);
          }
        });

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

  get colorChange() {
    return this.form.invalid ? 'grey' : 'blue';
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
}
