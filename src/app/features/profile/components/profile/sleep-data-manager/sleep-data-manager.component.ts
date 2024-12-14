import {Component, OnInit} from '@angular/core';
import {Router, RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-sleep-data-manager',
  standalone: true,
    imports: [
        RouterOutlet
    ],
  templateUrl: './sleep-data-manager.component.html',
  styleUrl: './sleep-data-manager.component.scss'
})
export class SleepDataManagerComponent implements OnInit {
  constructor(private _router: Router) {
  }

  ngOnInit() {
    this._router.navigate([`/profile/sleep-data-manager/bar-graph`]);
  }
}
