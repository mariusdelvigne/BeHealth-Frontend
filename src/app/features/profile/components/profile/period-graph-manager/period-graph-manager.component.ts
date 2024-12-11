import {Component, OnInit} from '@angular/core';
import {Router, RouterLinkActive, RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-period-graph-manager',
  standalone: true,
    imports: [
        RouterOutlet
    ],
  templateUrl: './period-graph-manager.component.html',
  styleUrl: './period-graph-manager.component.scss'
})
export class PeriodGraphManagerComponent implements OnInit {
  constructor(private _router: Router) {
  }

  ngOnInit() {
    this._router.navigate([`/profile/period-graph-manager/scatter-graph`, 'periods']);
  }
}
