import {Component, OnInit} from '@angular/core';
import {DatedValue} from '../../utils/DatedValue';
import {EChartsOption} from 'echarts';
import {NgxEchartsDirective} from 'ngx-echarts';
import {DatePipe} from '@angular/common';
import {UserFoodService} from '../../../../shared/services/user-food.service';
import {firstValueFrom} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {GraphData} from '../utils/graph-data';
import {GraphService} from '../services/graph.service';

@Component({
  selector: 'app-scatter-graph',
  standalone: true,
  imports: [
    DatePipe,
    NgxEchartsDirective
  ],
  templateUrl: './scatter-graph.component.html',
  styleUrl: './scatter-graph.component.scss'
})

export class ScatterGraphComponent implements OnInit {
  dataType: string = '';
  dataValues: GraphData = {yName: '', seriesName: '', measureUnit: ''};
  startDate: Date = new Date();
  endDate: Date = new Date();

  data: DatedValue[] = [];

  options: EChartsOption = {};
  updateOptions!: EChartsOption;

  constructor(private _graphService: GraphService, private _datePipe: DatePipe, private _userFoodService: UserFoodService, private _route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this._route.paramMap.subscribe(() => {
      this.dataType = this._route.snapshot.params['dataType'];
      this.dataValues = this._graphService.loadType(this.dataType, this.dataValues);
      this.loadOptions()
      this.loadData();
    });

    this.startDate.setDate(1);
    this.startDate.setHours(1, 0, 0, 0);
    this.endDate = new Date(this.startDate.getFullYear(), this.startDate.getMonth() + 1, 0,
      24, 59, 59, 999);

    this.loadOptions()
    this.loadData();
  }

  async loadData() {
    this.data = [];
    let dataToAdd: DatedValue[] = [];
    let pageNumber = 0;
    const pageSize: number = 20;

    do {
      let response = await firstValueFrom(this._userFoodService.getAllBetween(this.startDate, this.endDate, pageNumber++, pageSize));
      dataToAdd = response.userFoods.map((d: any) => ({
        date: new Date(d.eatenDatetime),
        value: d[this.dataType],
      }));

      this.data = this.data.concat(dataToAdd);
    } while (dataToAdd.length == pageSize);

    this.data.sort((a, b) => a.date.getTime() - b.date.getTime());
    this.updateChart();
  }

  changeMonth(next: boolean) {
    this.startDate = new Date(this.startDate
      .setMonth(this.startDate.getMonth() + (next ? 1 : -1))
    );
    this.endDate = new Date(this.startDate.getFullYear(), this.startDate.getMonth() + 1, 0,
      23, 59, 59, 999);

    this.loadData();
    this.loadOptions();
  }

  updateChart() {
    const dailyTotals = this._graphService.computeTotals(this.data);
    const scatterData = [];
    const daysInMonth = new Date(this.startDate.getFullYear(), this.startDate.getMonth() + 1, 0).getDate();

    // Iterate through each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      // Create the date for each day
      const date = new Date(this.startDate.getFullYear(), this.startDate.getMonth(), day);
      const dayString = this._datePipe.transform(date, 'yyyy-MM-dd') || '';

      // Add the data for the day, or 0 if no data for that day
      scatterData.push([date.getTime(), dailyTotals[dayString] || 0]);
    }


    this.updateOptions = {
      xAxis: {
        min: this.startDate,
        max: this.endDate,
      },
      series: [{
        data: scatterData,
      }],
      tooltip: {
        trigger: 'axis',
        formatter: (params: any) => {
          const data = params[0].data;
          return `<div class="text-center">
                    <div><b>${data[1].toFixed(2)}${this.dataValues.measureUnit}</b></div>
                    <div>${this._datePipe.transform(data[0], 'd/M/y')}</div>
                </div>`;
        },
      },
    };
  }

  loadOptions() {
    this.options = {
      xAxis: {
        name: 'Time',
        type: 'time',
        nameTextStyle: {
          fontWeight: 'bold',
        },
        min: this.startDate,
        max: this.endDate,
        splitNumber: 2,
      },
      yAxis: {
        name: this.dataValues.yName,
        type: 'value',
        nameTextStyle: {
          fontWeight: 'bold',
        },
        axisLine: {
          show: true,
        }
      },
      series: {
        name: this.dataValues.seriesName,
        type: 'line',
        symbol: 'circle',
        symbolSize: 10,
        itemStyle: {
          color: '#424874',
        },
        lineStyle: {
          color: '#424874',
          width: 3,
        },
        areaStyle: {
          color: '#424874',
        },
      },
    };
  }
}
