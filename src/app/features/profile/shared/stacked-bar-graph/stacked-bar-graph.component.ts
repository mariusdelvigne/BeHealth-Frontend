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
    this.startDate =  monday;

    // week end => Sunday
    this.endDate.setDate(this.startDate.getDate() + 6);

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
        food: d.name,
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
  }

  groupDataByDayAndFood(data: DatedValue[]) {
    // Example : "Apple": { Mon: 100, Tue: 0, Wed: 450, Thu: 0, Fri: 0, Sat: 0, Sun: 0 }
    const grouped: { [food: string]: { [day: string]: number } } = {};

    data.forEach(d => {
      const day = d.date.toLocaleString('en-US', { weekday: 'short' });

      // Initialize the food group if it doesn't exist
      if (!grouped[d.food]) {
        grouped[d.food] = { Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0, Sun: 0 };
      }
      // Add the value of the userFood to the current value
      // To the specific food and day
      grouped[d.food][day] += d.value;
    });

    return grouped;
  }

  updateChart() {
    const groupedData = this.groupDataByDayAndFood(this.data);
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
          return `${params.value}${this.dataValues.measureUnit}`
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
