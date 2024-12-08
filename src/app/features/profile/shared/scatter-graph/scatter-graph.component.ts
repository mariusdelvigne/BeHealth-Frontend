import {Component, OnInit} from '@angular/core';
import {DatedValue} from '../../utils/DatedValue';
import {EChartsOption, SeriesOption} from 'echarts';
import {NgxEchartsDirective} from 'ngx-echarts';
import {DatePipe} from '@angular/common';
import {UserFoodService} from '../../../../shared/services/user-food.service';
import {firstValueFrom} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {GraphData} from '../utils/graph-data';

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
  dataValues: GraphData = {yName: '', seriesName: ''};
  startDate: Date = new Date();
  endDate: Date = new Date();

  data: DatedValue[] = [];

  options: EChartsOption = {};
  chart!: NgxEchartsDirective;

  constructor(private _datePipe: DatePipe, private _userFoodService: UserFoodService, private _route: ActivatedRoute, private _toastrService: ToastrService ) {
  }

  ngOnInit(): void {
    this._route.paramMap.subscribe(() => {
      this.dataType = this._route.snapshot.params['dataType'];
      this.loadType()
      this.loadOptions()
      this.loadData();
    });

    this.startDate.setDate(1);
    this.startDate.setHours(0, 0, 0, 0);
    this.endDate = new Date(this.startDate.getFullYear(), this.startDate.getMonth() + 1, 0,
      23, 59, 59, 999);

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

  loadType() {
    switch (this.dataType) {
      case 'calories':
        this.dataValues = {yName: "Calories", seriesName: 'Calories'};
        break;
      case 'cholesterol':
        this.dataValues = {yName: "Cholesterol", seriesName: 'Cholesterol'};
        break;
      case 'sugars':
        this.dataValues = {yName: "Sugars", seriesName: 'Sugars'};
        break;
      case 'proteins':
        this.dataValues = {yName: "Proteins", seriesName: 'Proteins'};
        break;
      default:
        this._toastrService.error("Data type not supported");
        break;
    }
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
  updateChart() {
    if (this.chart !== undefined) {
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

  loadOptions() {
    this.options = {
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
        name: this.dataValues.yName,
        type: 'value',
        nameTextStyle: {
          fontWeight: 'bold',
        },
        axisLine: {
          show: true,
        }
      },
      tooltip: {
        trigger: 'axis',
        formatter: (params: any) => {
          const data = params[0].data;
          return `<div class="text-center">
                    <div><b>${data[1]}g ${this.dataType}</b></div>
                    <div>${this._datePipe.transform(data[0], 'd/M/y')}</div>
                </div>`;
        },
      },
      series: {
        name: this.dataValues.seriesName,
        type: 'line',
        data: this.data.map(d => [this._datePipe.transform(d.date, 'yyyy-MM-dd'), d.value]),
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
