import {Component} from '@angular/core';
import {Router, RouterLinkActive, RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-period-data-manager',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLinkActive,
  ],
  templateUrl: './period-data-manager.component.html',
  styleUrl: './period-data-manager.component.scss'
})
export class PeriodDataManagerComponent{
  constructor(private _router: Router) {
  }

  goToCalendar() {
    this._router.navigate([`/profile/period-data-manager/period-calendar`]);
  }
}
