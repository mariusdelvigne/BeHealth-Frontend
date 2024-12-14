import {Component, OnInit} from '@angular/core';
import {Router, RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-period-data-manager',
  standalone: true,
  imports: [
    RouterOutlet,
  ],
  templateUrl: './period-data-manager.component.html',
  styleUrl: './period-data-manager.component.scss'
})
export class PeriodDataManagerComponent implements OnInit {
  constructor(private _router: Router) {
  }

  ngOnInit() {
    this._router.navigate([`/profile/period-data-manager/period-calendar`]);
  }
}
