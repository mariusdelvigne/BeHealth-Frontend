import { Component } from '@angular/core';
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-food-scatter-graph',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    RouterOutlet
  ],
  templateUrl: './food-graph-manager.component.html',
  styleUrl: './food-graph-manager.component.css'
})
export class FoodGraphManagerComponent {
  constructor(private _router: Router) {
  }

  goToGraph(dataType: string) {
    this._router.navigate(['/profile/food-graph-manager/food-graph', dataType]);
  }
}
