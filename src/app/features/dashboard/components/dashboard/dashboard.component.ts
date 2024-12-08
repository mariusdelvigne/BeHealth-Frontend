import {Component, OnInit} from '@angular/core';
import {RouterLink} from '@angular/router';
import {UserService} from '../../../../shared/services/user.service';
import {AuthService} from '../../../../core/auth/services/auth.service';
import {DatePipe} from '@angular/common';
import {TimePipe} from '../../../../shared/utils/time.pipe';
import {DashboardData} from '../../DashboardData';

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
  userData: DashboardData = {};

  constructor(private _userService: UserService, private _authService: AuthService) { }

  dateDiff(startDate: Date | string, endDate: Date | string): number {
    return (new Date(startDate).getTime() - new Date(endDate).getTime()) / 1000;
  }

  ngOnInit(): void {
    this._userService.getCurrentData(this._authService.getId())
    .subscribe({
      next: data => this.userData = data,
    });
  }
}
