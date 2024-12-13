import { Component } from '@angular/core';
import {Router, RouterLinkActive, RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-sleep-data-manager',
  standalone: true,
    imports: [
        RouterLinkActive,
        RouterOutlet
    ],
  templateUrl: './sleep-data-manager.component.html',
  styleUrl: './sleep-data-manager.component.scss'
})
export class SleepDataManagerComponent {
  constructor(private _router: Router) {
  }

  goToGraph() {
    this._router.navigate([`/profile/sleep-data-manager/bar-graph`]);
  }
}
