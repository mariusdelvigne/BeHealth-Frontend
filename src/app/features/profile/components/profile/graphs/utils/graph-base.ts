import {DatedValue} from '../../../../utils/DatedValue';
import {EChartsOption} from 'echarts';
import {DatePipe} from '@angular/common';
import {Directive, OnInit} from '@angular/core';
import {firstValueFrom, Observable} from 'rxjs';

@Directive()
export abstract class GraphBase implements OnInit {
  startDate: Date = new Date();
  endDate: Date = new Date();
  data: DatedValue[] = [];
  dataLoading: boolean = false;

  options!: EChartsOption;
  updateOptions!: EChartsOption;

  protected constructor(protected _datePipe: DatePipe) {}

  ngOnInit(): void {
    // Set dates to start and end of the month
    this.startDate.setDate(1);
    this.startDate.setHours(0, 0, 0, 0);

    this.endDate = new Date(this.startDate.getFullYear(), this.startDate.getMonth() + 1, 0,
      23, 59, 59, 999);

    this.loadData();
  }

  changeMonth(next: boolean) {
    // Move to next or previous month
    this.startDate = new Date(
      this.startDate.setMonth(this.startDate.getMonth() + (next ? 1 : -1))
    );
    this.endDate = new Date(this.startDate.getFullYear(), this.startDate.getMonth() + 1, 0,
      23, 59, 59, 999);

    this.loadData();
  }

  async loadData() {
    // Load all data between startDate and endDate from the function loadOnePageOfData
    this.dataLoading = true;

    this.data = [];
    let dataToAdd: DatedValue[] = [];
    let pageNumber = 0;
    const pageSize = 20;

    do {
      dataToAdd = await firstValueFrom(this.loadPageOfData(pageNumber++, pageSize));
      this.data = this.data.concat(dataToAdd);
    } while(dataToAdd.length == pageSize);

    this.updateChart();
    this.dataLoading = false;
  }

  abstract loadPageOfData(pageNumber: number, pageSize: number): Observable<DatedValue[]>;

  updateChart() {
    this.updateOptions = {
      xAxis: {
        min: this.startDate,
        max: this.endDate
      },
      series: {
        data: this.data.map(d => [d.date, d.value]),
      },
    };
  }
}
