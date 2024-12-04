import {Component, OnInit} from '@angular/core';
import {DatePipe} from "@angular/common";
import {NgxEchartsDirective} from "ngx-echarts";
import {DatedValue} from '../../../../utils/DatedValue';
import {EChartsOption, SeriesOption} from 'echarts';
import {UserHeightService} from '../../../../../../shared/services/user-height.service';
import {UserFoodService} from '../../../../../../shared/services/user-food.service';
import {firstValueFrom} from 'rxjs';

@Component({
  selector: 'app-calories-graph',
  standalone: true,
    imports: [
        DatePipe,
        NgxEchartsDirective
    ],
  templateUrl: './calories-graph.component.html',
  styleUrl: './calories-graph.component.css'
})
export class CaloriesGraphComponent implements OnInit{
  startDate: Date = new Date();
  endDate: Date = new Date();

  data: DatedValue[] = [];

  options: EChartsOption = {
    xAxis: {
      name: 'Time',
      type: 'time',
      axisLabel: {
        formatter: (value: number) => {
          return `${this._datePipe.transform(value, 'd/M/y')}`;
        },
      },
      nameTextStyle: {
        fontWeight: 'bold',
      },
      min: this.startDate,
      max: this.endDate,
      splitNumber: 2,
    },
    yAxis: {
      name: 'Calories in gr.',
      type: 'value',
      nameTextStyle: {
        fontWeight: 'bold',
      },
      axisLine: {
        show: true,
      }
    },
    series: {
      name: 'Calories',
      type: 'line',
      data: this.data.map(d => [d.date, d.value]),
      symbol: 'circle',
      symbolSize: 10,
      itemStyle: {
        color: 'rgba(15, 80, 250, 0.9)',
      },
      lineStyle: {
        color: 'rgba(15, 80, 250, 0.9)',
        width: 3,
      },
      areaStyle: {
        color: 'rgba(15, 80, 250, 0.3)',
      },
    },
  };

  chart!: NgxEchartsDirective;

  constructor(private _datePipe: DatePipe, private _userFoodService: UserFoodService) { }

  ngOnInit(): void {
    this.startDate.setDate(1);
    this.startDate.setHours(0, 0, 0, 0);

    this.endDate = new Date(this.startDate.getFullYear(), this.startDate.getMonth() + 1, 0,
      23, 59, 59, 999);
  }

  onChartInit(e: any): void {
    this.chart = e;
    this.loadData();
  }

  changeMonth(next: boolean) {
    this.startDate = new Date(this.startDate
      .setMonth(this.startDate.getMonth() + (next ? 1 : -1))
    );
    this.endDate = new Date(this.startDate.getFullYear(), this.startDate.getMonth() + 1, 0,
      23, 59, 59, 999);

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
        date: new Date(d.eatenDateTime),
        value: d.calories,
      }));

      this.data = this.data.concat(dataToAdd);
    } while(dataToAdd.length == pageSize);

    this.updateChart();
  }

  updateChart() {
    if (this.chart !== undefined) {
      console.log(this.data);
      const series = this.options.series as SeriesOption;
      series.data = this.data.map(d => [d.date, d.value]);

      const xAxis = this.options.xAxis;
      // @ts-ignore
      xAxis!.min = this.startDate;
      // @ts-ignore
      xAxis!.max = this.endDate;

      // @ts-ignore
      this.chart.setOption(this.options);
    }
  }
}
