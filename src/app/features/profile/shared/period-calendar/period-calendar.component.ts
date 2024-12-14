import {Component, OnInit} from '@angular/core';
import {CalendarCommonModule, CalendarEvent, CalendarMonthModule, CalendarView} from 'angular-calendar';
import {NgSwitch, NgSwitchCase} from '@angular/common';
import {UserPeriodService} from '../../../../shared/services/user-period.service';
import {ToastrService} from 'ngx-toastr';
import {firstValueFrom} from 'rxjs';
import {PeriodInfo} from '../utils/period-info';

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

  periods: PeriodInfo[] = [];
  startMonth: Date = new Date();
  endMonth: Date = new Date();

  constructor(private _userPeriodService: UserPeriodService, private _toastrService: ToastrService) {
  }

  ngOnInit() {
    this.changeMonth();
    this.setView(CalendarView.Month);

    this.loadPeriods().then(() => {
      this.loadEvents();
      this.goToToday();
    });
  }

  changeMonth() {
    // Start to the month before if a period is between 2 month
    this.startMonth = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth() -1, 1);
    this.endMonth = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth() + 1, 0);
  }

  async loadPeriods() {
    this.periods = [];
    let dataToAdd: PeriodInfo[] = [];
    let pageNumber = 0;
    const pageSize: number = 20;

    // Retrieve periods
    do {
      let response = await firstValueFrom(this._userPeriodService.getAllBetween(this.startMonth, this.endMonth, pageNumber++, pageSize));
      dataToAdd = response.userPeriods.map((d: any) => ({
        startDate: new Date(d.startDate),
        endDate: new Date(d.endDate),
      }));

      this.periods = this.periods.concat(dataToAdd);
    } while (dataToAdd.length == pageSize);

    this.periods.sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
  }

  loadEvents() {
    let nbPeriods = 1;
    this.periods.forEach((period: { startDate: any; endDate: any; }) => {
      const event = {
        title: `Period ${nbPeriods}`,
        start: new Date(period.startDate),
        end: new Date(period.endDate),
      }
      nbPeriods += 1;

      this.events.push(event);
    });
  }

  setView(view: CalendarView) {
    this.view = view;
    this.changeMonth();
  }

  goToToday() {
    this.viewDate = new Date();
  }
}
