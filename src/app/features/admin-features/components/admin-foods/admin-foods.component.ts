import {Component, OnInit} from '@angular/core';
import {FoodService} from '../../../../shared/services/food.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-admin-foods',
  standalone: true,
  imports: [],
  templateUrl: './admin-foods.component.html',
  styleUrl: './admin-foods.component.scss'
})
export class AdminFoodsComponent implements OnInit {
  foods: any[] = [];

  constructor(private _foodService: FoodService, private _toastrService: ToastrService) {
  }

  ngOnInit() {
    this._foodService.getAllStartingWith().subscribe({
      next: (food) => {
        this.foods = food.foods;
      }
    })
  }

  deleteFood(id: number) {
    const isConfirmed = window.confirm('Are you sure you want to delete this food item?');
    if (isConfirmed) {
      this._foodService.deleteFoods(id).subscribe(
        () => {
          window.location.reload();
        },
        (error) => {
          this._toastrService.error(error);
        }
      );
    }
  }
}
