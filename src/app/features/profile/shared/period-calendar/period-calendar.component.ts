import {Component, OnInit} from '@angular/core';
import {CalendarCommonModule, CalendarEvent, CalendarMonthModule, CalendarView} from 'angular-calendar';
import {NgSwitch, NgSwitchCase} from '@angular/common';
import {UserPeriodService} from '../../../../shared/services/user-period.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-period-calendar',
  standalone: true,
  imports: [
    CalendarMonthModule,
    CalendarCommonModule,
    NgSwitch,
    NgSwitchCase
  ],
  templateUrl: './period-calendar.component.html',
  styleUrl: './period-calendar.component.scss'
})
export class PeriodCalendarComponent implements OnInit {
  viewDate: Date = new Date();
  view: CalendarView = CalendarView.Week;
  CalendarView = CalendarView;
  events: CalendarEvent[] = [];

  periods: any;

  constructor(private _userPeriodService: UserPeriodService, private _toastrService: ToastrService) {
  }

  ngOnInit() {
    this.setView(CalendarView.Month);
    this.loadData();
  }

  loadData() {
    let pageNumber = 0;
    const pageSize: number = 20;

    this._userPeriodService.getAll(pageNumber, pageSize).subscribe({
      next: (response) => {
        this.periods = response.userPeriods;

        console.log(this.periods);
        let nbPeriods = 1;
        this.periods.forEach((period: { id: any; startDate: any; endDate: any; }) => {

          const event = {
            title: `Period ${nbPeriods}`,
            start: new Date(period.startDate),
            end: new Date(period.endDate),
          }
          nbPeriods += 1;

          this.events.push(event);
        })

        console.log(this.events);
      },
      error: (error) => {
        this._toastrService.error(error);
      }
    });
  }

  setView(view: CalendarView) {
    this.view = view;
  }
}
