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
  graphType: string = 'scatter';
  dataType: string = 'calories';
  constructor(private _router: Router) {
  }

  setDataType(dataType: string) {
    this.dataType = dataType;
    this.goToGraph()
  }

  setGraphType(type: string) {
    this.graphType = type;
    this.goToGraph()
  }

  goToGraph() {
    this._router.navigate([`/profile/food-graph-manager/${this.graphType}-graph`, this.dataType]);
  }

}
