import { Component } from '@angular/core';
import {Router, RouterLinkActive, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-food-scatter-graph',
  standalone: true,
  imports: [
    RouterLinkActive,
    RouterOutlet
  ],
  templateUrl: './food-graph-manager.component.html',
  styleUrls: [
    './food-graph-manager.component.scss',
  ]
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
