import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {animate, state, style, transition, trigger} from '@angular/animations';
import {UserFoodService} from '../../../../../shared/services/user-food.service';
import {debounceTime} from 'rxjs';
import {FoodService} from '../../../../../shared/services/food.service';

@Component({
  selector: 'app-insert-food',
  standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule
    ],
  templateUrl: './insert-food.component.html',
  styleUrl: './insert-food.component.css',
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
export class InsertFoodComponent implements OnInit {
  form: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    quantityInG: new FormControl('', [Validators.required, Validators.min(1)]),
    eatenDatetime: new FormControl('', Validators.required),
  });

  foods: any[] = [];

  constructor(private _userFoodService: UserFoodService, private _foodService: FoodService) { }

  ngOnInit() {
    this.form.get('name')?.valueChanges
      .pipe(debounceTime(300))
      .subscribe(value => {
        this.updateFoodList(value);
      });
  }

  emitUserFood() {
    this._userFoodService.create(this.form.value).subscribe({
      next: response => alert(response),
    });
  }

  get colorChange() {
    return this.form.invalid ? 'grey' : 'blue';
  }

  updateFoodList(name: string) {
    this._foodService.getAllStartingWith(name)
      .subscribe({
        next: response => this.foods = response.foods,
      });
  }
}
