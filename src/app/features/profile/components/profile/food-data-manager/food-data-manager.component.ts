import {Component, OnInit} from '@angular/core';
import {Router, RouterLinkActive, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-food-scatter-graph',
  standalone: true,
  imports: [
    RouterLinkActive,
    RouterOutlet
  ],
  templateUrl: './food-data-manager.component.html',
  styleUrls: [
    './food-data-manager.component.scss',
  ]
})
export class FoodDataManagerComponent implements OnInit {
  graphType: string = 'scatter';
  dataType: string = 'calories';
  type: string = 'foods';

  constructor(private _router: Router) {
  }

  ngOnInit() {
    this.goToGraph();
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
    this._router.navigate([`/profile/food-data-manager/${this.graphType}-graph`, this.dataType, this.type]);
  }
}
