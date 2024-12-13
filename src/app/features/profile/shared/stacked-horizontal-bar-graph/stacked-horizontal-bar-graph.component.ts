import {Component, OnInit} from '@angular/core';
import {DatePipe} from "@angular/common";
import {NgxEchartsDirective} from "ngx-echarts";
import {GraphData} from '../utils/graph-data';
import {EChartsOption} from 'echarts';
import {GraphService} from '../services/graph.service';
import {ActivatedRoute} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {firstValueFrom} from 'rxjs';
import {UserSleepService} from '../../../../shared/services/user-sleep.service';
import {SleepInfo} from '../utils/sleep-info';

@Component({
  selector: 'app-stacked-horizontal-bar-graph',
  standalone: true,
    imports: [
        DatePipe,
        NgxEchartsDirective
    ],
  templateUrl: './stacked-horizontal-bar-graph.component.html',
  styleUrl: './stacked-horizontal-bar-graph.component.scss'
})
export class StackedHorizontalBarGraphComponent implements OnInit {
  dataValues: GraphData = {yName: '', seriesName: '', measureUnit: ''};
  startDate: Date = new Date();
  endDate: Date = new Date();

  data: SleepInfo[] = [];

  options!: EChartsOption;
  updateOptions!: EChartsOption;

  constructor(private _graphService: GraphService, private _userSleepService: UserSleepService, private _route: ActivatedRoute, private _toastrService: ToastrService ) {
  }

  ngOnInit(): void {
    this._route.paramMap.subscribe(() => {
      this.dataValues = this._graphService.loadType('sleeps', this.dataValues);
      this.loadOptions()
      this.loadData();
    });

    // 0 : sunday, 1 : monday, ...
    const monday = new Date();
    const diff = monday.getDay() === 0 ? -6 : 1 - monday.getDay()

    // week start => Monday
    monday.setDate(monday.getDate() + diff);
    monday.setHours(0, 0, 0, 0);
    this.startDate =  monday;

    // week end => Sunday
    this.endDate.setDate(this.startDate.getDate() + 6);
    this.endDate.setHours(23, 59, 59, 999);

    this.loadOptions()
    this.loadData();
  }

  async loadData() {
    this.data = [];
    let dataToAdd: SleepInfo[] = [];
    let pageNumber = 0;
    const pageSize: number = 20;

    do {
      let response = await firstValueFrom(this._userSleepService.getAllBetween(this.startDate, this.endDate, pageNumber++, pageSize));
      dataToAdd = response.userSleeps.map((d: any) => ({
        startDatetime: new Date(d.startDatetime),
        endDatetime: new Date(d.endDatetime),
      }));

      this.data = this.data.concat(dataToAdd);
    } while (dataToAdd.length == pageSize);

    this.data.sort((a, b) => a.startDatetime.getTime() - b.startDatetime.getTime());

    this.updateChart();
  }

  changeWeek(next: boolean) {
    this.startDate = new Date(this.startDate.setDate(this.startDate.getDate() + (next ? 7 : -7)));

    this.endDate= new Date(this.endDate.setDate(this.endDate.getDate() + (next ? 7 : -7)));

    this.loadData();
    this.loadOptions();
  }

  updateChart() {
    const groupedData = this._graphService.groupDataByDayAndSleep(this.data, this.endDate);
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    this.updateOptions = {
      series: Object.keys(groupedData).map(sleepPhase => ({
        name: '',
        type: 'bar',
        stack: 'total',
        barWidth: '60%',
        label: {
          show: true,
          position: 'insideRight',
          formatter: (params: any) => params.value == 0 ? `` : `${params.seriesName}`,
        },
        data: days.map(day => groupedData[sleepPhase][day]),
      })),
      tooltip: {
        trigger: 'item',
        formatter: (params: any) => {
          return `${params.value.toFixed(2)} hours`;
        }
      },
    };
  }


  loadOptions() {
    this.options = {
      xAxis: {
        name: 'Days',
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        nameTextStyle: {
          fontWeight: 'bold',
        },
        axisLine: {
          show: true,
        },
      },
      yAxis: {
        name: 'Time (hours)',
        type: 'value',
        min: 0,
        max: 24,
        nameTextStyle: {
          fontWeight: 'bold',
        },
        axisLine: {
          show: true,
        },
      },
    };
  }

}
