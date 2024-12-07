import {Component, OnInit} from '@angular/core';
import {RouterLink} from '@angular/router';
import {UserService} from '../../../../shared/services/user.service';
import {AuthService} from '../../../../core/auth/services/auth.service';
import {DatePipe} from '@angular/common';
import {TimePipe} from '../../../../shared/utils/time.pipe';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    RouterLink,
    DatePipe,
    TimePipe
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  userData = {
    sleep: {
      startDatetime: new Date(2024, 12, 5),
      endDatetime: new Date(2024, 12, 6),
    },
    food: {
      eatenDatetime: new Date(),
      quantityInG: 200,
      name: 'Apple',
    },
    sport: {
      startDatetime: new Date(),
      endDatetime: new Date(),
      name: 'Marathon',
    },
    period: {
      startDate: new Date(),
      endDate: new Date(),
    },
    height: {
      inputDate: new Date(),
      heightInCm: 0,
    },
    weight: {
      inputDate: new Date(),
      weightInKg: 0,
    }
  };

  constructor(private _userService: UserService, private _authService: AuthService) { }

  dateDiff(startDate: Date, endDate: Date): number {
    return (startDate.getTime() - endDate.getTime()) / 1000;
  }

  ngOnInit(): void {
    this._userService.getCurrentData(this._authService.getId())
    .subscribe({
      next: data => this.userData = data,
    });
  }
}
