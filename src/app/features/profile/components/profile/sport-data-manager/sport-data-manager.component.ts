import {Component, OnInit} from '@angular/core';
import {Router, RouterLinkActive, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-sport-scatter-graph',
  standalone: true,
  imports: [
    RouterLinkActive,
    RouterOutlet
  ],
  templateUrl: './sport-data-manager.component.html',
  styleUrl: './sport-data-manager.component.scss'
})
export class SportDataManagerComponent implements OnInit {
  graphType: string = 'scatter';
  dataType: string = 'calories';
  type: string = 'sports';

  constructor(private _router: Router) {
  }

  ngOnInit() {
    this.goToGraph();
  }

  setGraphType(type: string) {
    this.graphType = type;
    this.goToGraph()
  }

  goToGraph() {
    this._router.navigate([`/profile/sport-data-manager/${this.graphType}-graph`, this.dataType, this.type]);
  }
}
