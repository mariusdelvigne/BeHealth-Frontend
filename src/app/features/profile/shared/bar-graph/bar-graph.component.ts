import {Component, OnInit} from '@angular/core';
import {GraphData} from '../utils/graph-data';
import {DatedValue} from '../../utils/DatedValue';
import {EChartsOption} from 'echarts';
import {NgxEchartsDirective} from 'ngx-echarts';
import {DatePipe} from '@angular/common';
import {UserFoodService} from '../../../../shared/services/user-food.service';
import {ActivatedRoute} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {firstValueFrom} from 'rxjs';

@Component({
  selector: 'app-bar-graph',
  standalone: true,
  imports: [
    DatePipe,
    NgxEchartsDirective
  ],
  templateUrl: './bar-graph.component.html',
  styleUrl: './bar-graph.component.scss'
})
export class BarGraphComponent implements OnInit {
  dataType: string = '';
  dataValues: GraphData = {yName: '', seriesName: '', measureUnit: ''};
  startDate: Date = new Date();
  endDate: Date = new Date();

  data: DatedValue[] = [];

  options!: EChartsOption;
  updateOptions!: EChartsOption;

  constructor(private _datePipe: DatePipe, private _userFoodService: UserFoodService, private _route: ActivatedRoute, private _toastrService: ToastrService ) {
  }

  ngOnInit(): void {
    this._route.paramMap.subscribe(() => {
      this.dataType = this._route.snapshot.params['dataType'];
      this.loadType()
      this.loadOptions()
      this.loadData();
    });

    // 0 : sunday, 1 : monday, ...
    const monday = new Date();
    const diff = monday.getDay() === 0 ? -6 : 1 - monday.getDay()

    // week start => Monday
    monday.setDate(monday.getDate() + diff);
    monday.setHours(1, 0, 0, 0);
    this.startDate = monday;

    // week end => Sunday
    this.endDate.setDate(this.startDate.getDate() + 6);
    this.endDate.setHours(24, 59, 59, 999);

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
        this.dataValues = {yName: "Calories", seriesName: 'Calories', measureUnit: 'kcal'};
        break;
      case 'cholesterol':
        this.dataValues = {yName: "Cholesterol", seriesName: 'Cholesterol', measureUnit: 'g'};
        break;
      case 'sugars':
        this.dataValues = {yName: "Sugars", seriesName: 'Sugars', measureUnit: 'g'};
        break;
      case 'proteins':
        this.dataValues = {yName: "Proteins", seriesName: 'Proteins', measureUnit: 'g'};
        break;
      default:
        this._toastrService.error("Data type not supported");
        break;
    }
  }

  changeWeek(next: boolean) {
    this.startDate = new Date(this.startDate.setDate(this.startDate.getDate() + (next ? 7 : -7)));

    this.endDate= new Date(this.endDate.setDate(this.endDate.getDate() + (next ? 7 : -7)));

    this.loadData();
    this.loadOptions();
  }

  updateChart() {
    this.updateOptions = {
      series: {
        data: this.data.map(d => [d.date.toLocaleString('en-US', {weekday: "short"}), d.value]),
      },
    };
  }

  loadOptions() {
    this.options = {
      xAxis: {
        name: 'Time',
        type: 'category',
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      yAxis: {
        name: this.dataValues.yName,
        type: 'value',
        nameTextStyle: {
          fontWeight: 'bold',
        },
        axisLine: {
          show: true,
        },
      },
      series: {
        name: this.dataValues.seriesName,
        type: 'bar',
        data: this.data.map(d => [d.date.toLocaleString('en-US', {weekday: "short"}), d.value]),
        itemStyle: {
          color: '#424874',
        },
      },
      tooltip: {
        trigger: 'axis',
        formatter: (params: any) => {
          const data = params[0].data;
          return `<div class="text-center">
                    <div><b>${data[1].toFixed(2)}${this.dataValues.measureUnit}</b></div>
                </div>`;
        },
      },
    };
  }

}
