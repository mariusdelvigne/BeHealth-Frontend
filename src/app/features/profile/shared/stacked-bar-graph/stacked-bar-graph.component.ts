import {Component, OnInit} from '@angular/core';
import {DatePipe} from "@angular/common";
import {NgxEchartsDirective} from "ngx-echarts";
import {GraphData} from '../utils/graph-data';
import {DatedValue} from '../../utils/DatedValue';
import {EChartsOption} from 'echarts';
import {UserFoodService} from '../../../../shared/services/user-food.service';
import {ActivatedRoute} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {firstValueFrom} from 'rxjs';
import {GraphService} from '../services/graph.service';
import {UserSportService} from '../../../../shared/services/user-sport.service';

@Component({
  selector: 'app-stacked-bar-graph',
  standalone: true,
    imports: [
        DatePipe,
        NgxEchartsDirective
    ],
  templateUrl: './stacked-bar-graph.component.html',
  styleUrl: './stacked-bar-graph.component.scss'
})
export class StackedBarGraphComponent implements OnInit {
  dataType: string = '';
  type: string = '';
  dataValues: GraphData = {yName: '', seriesName: '', measureUnit: ''};
  startDate: Date = new Date();
  endDate: Date = new Date();

  data: DatedValue[] = [];

  options!: EChartsOption;
  updateOptions!: EChartsOption;

  constructor(private _graphService: GraphService, private _userFoodService: UserFoodService, private _route: ActivatedRoute,
              private _toastrService: ToastrService, private _userSportService: UserSportService ) {
  }

  ngOnInit(): void {
    this._route.paramMap.subscribe(() => {
      this.dataType = this._route.snapshot.params['dataType'];
      this.type = this._route.snapshot.params['type'];
      this.dataValues = this._graphService.loadType(this.dataType, this.dataValues);
      this.loadOptions()
      this.loadData();
    });

    // 0 : sunday, 1 : monday, ...
    const monday = new Date();
    const diff = monday.getDay() === 0 ? -6 : 1 - monday.getDay()

    // week start => Monday
    monday.setDate(monday.getDate() + diff);
    monday.setHours(1, 0, 0, 0);
    this.startDate =  monday;

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
      if (this.type == "sports") {
        let response = await firstValueFrom(this._userSportService.getAllBetween(this.startDate, this.endDate, pageNumber++, pageSize));
        console.log(response)
        dataToAdd = response.userSports.map((d: any) => ({
          date: new Date(d.startDatetime),
          food: d.name,
          value: d[this.dataType],
        }));
      }
      else if (this.type == "foods") {
        let response = await firstValueFrom(this._userFoodService.getAllBetween(this.startDate, this.endDate, pageNumber++, pageSize));
        dataToAdd = response.userFoods.map((d: any) => ({
          date: new Date(d.eatenDatetime),
          food: d.name,
          value: d[this.dataType],
        }));
      }

      this.data = this.data.concat(dataToAdd);
    } while (dataToAdd.length == pageSize);

    this.data.sort((a, b) => a.date.getTime() - b.date.getTime());

    this.updateChart();
  }

  changeWeek(next: boolean) {
    this.startDate = new Date(this.startDate.setDate(this.startDate.getDate() + (next ? 7 : -7)));

    this.endDate= new Date(this.endDate.setDate(this.endDate.getDate() + (next ? 7 : -7)));

    this.loadData();
    this.loadOptions();
  }

  updateChart() {
    const groupedData = this._graphService.groupDataByDayAndFood(this.data);
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

      this.updateOptions = {
        series: Object.keys(groupedData).map(food => ({
          name: food,
          type: 'bar',
          stack: 'total',
          barWidth: '60%',
          label: {
            show: true,
            formatter: (params: any) => params.value == 0 ? `` : `${params.seriesName}`,
          },
          data: days.map(day => groupedData[food][day]),
        })),
        tooltip: {
          trigger: 'item',
          formatter: (params: any) => {
            return `${params.value.toFixed(2)}${this.dataValues.measureUnit}`
          }
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
    };
  }
}
