import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {UserFoodService} from '../../../../services/user-food.service';
import {debounceTime} from 'rxjs';
import {FoodService} from '../../../../services/food.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-insert-food',
  standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule
    ],
  templateUrl: './insert-food.component.html',
  styleUrl: './insert-food.component.scss',
})
export class InsertFoodComponent implements OnInit {
  form: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    quantityInG: new FormControl('', [Validators.required, Validators.min(1)]),
    eatenDatetime: new FormControl('', Validators.required),
  });

  foods: any[] = [];

  constructor(private _userFoodService: UserFoodService, private _foodService: FoodService, private _toastrService: ToastrService) { }

  ngOnInit() {
    this.form.get('name')?.valueChanges
      .pipe(debounceTime(300))
      .subscribe(value => {
        this.updateFoodList(value);
      });
  }

  emitUserFood() {
    this._userFoodService.create(this.form.value).subscribe({
      next: () => this._toastrService.success("Created Food successfully."),
      error: (error) => this._toastrService.error("Error creating the food : " + error.message)
    });
  }

  updateFoodList(name: string) {
    this._foodService.getAllStartingWith(name)
      .subscribe({
        next: response => this.foods = response.foods,
      });
  }
}
