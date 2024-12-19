import {Injectable} from '@angular/core';
import {DatedValue} from '../../utils/DatedValue';
import {DatePipe} from '@angular/common';
import {GraphData} from '../utils/graph-data';
import {ToastrService} from 'ngx-toastr';
import {SleepInfo} from '../utils/sleep-info';

@Injectable({
  providedIn: 'root'
})
export class GraphService {

  constructor(private _datePipe: DatePipe, private _toastrService: ToastrService) {
  }

  groupDataByDayAndFood(data: DatedValue[]) {
    // Example : "Apple": { Mon: 100, Tue: 0, Wed: 450, Thu: 0, Fri: 0, Sat: 0, Sun: 0 }
    const grouped: { [food: string]: { [day: string]: number } } = {};

    data.forEach(d => {
      const day = d.date.toLocaleString('en-US', {weekday: 'short'});

      // Initialize the food group if it doesn't exist
      if (!grouped[d.food]) {
        grouped[d.food] = {Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0, Sun: 0};
      }
      // Add the value of the userFood to the current value
      // to the specific food and day
      grouped[d.food][day] += d.value;
    });

    return grouped;
  }

  groupDataByDayAndSleep(data: SleepInfo[]) {
    // { 'Sleeping': { Mon: 8, Tue: 7 }}
    const grouped: { [phase: string]: { [day: string]: number } } = {
      'Sleeping': {Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0, Sun: 0},
    };

    data.forEach(sleep => {

      const start = new Date(sleep.startDatetime);
      const end = new Date(sleep.endDatetime);

      const day = start.toLocaleString('en-US', {weekday: 'short'});

      const duration = end.getTime() - start.getTime();

      // Convert Date => hours
      const hours = duration / (1000 * 60 * 60);

      // Add hours to the sleep phase of this day
      grouped['Sleeping'][day] += hours;
    });

    return grouped;
  }

  groupDataByDayAndSport(data: DatedValue[]) {
    const grouped: { [sport: string]: { [day: string]: number } } = {};

    data.forEach(d => {
      const day = d.date.toLocaleString('en-US', {weekday: 'short'});
      if(!grouped[d.sport]) {
        grouped[d.sport] = {Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0, Sun: 0};
      }
      grouped[d.sport][day] += d.value;
    });

    return grouped;
  }

  computeTotals(data: DatedValue[]): { [day: string]: number } {
    const totals: { [day: string]: number } = {};

    // Totals for each day
    data.forEach(d => {
      const dayNumber = this._datePipe.transform(d.date, 'yyyy-MM-dd') || '';

      // If the day isn't in the list yet we add it
      if (!totals[dayNumber]) {
        totals[dayNumber] = 0;
      }
      // Append the data to the current data for this day of the month
      totals[dayNumber] += d.value;
    });

    return totals;
  }

  loadType(dataType: string, dataValues: GraphData) {
    dataValues = {yName: '', seriesName: '', measureUnit: ''};
    switch (dataType) {
      case 'calories':
        dataValues = {yName: "Calories", seriesName: 'Calories', measureUnit: 'kcal'};
        break;
      case 'cholesterol':
        dataValues = {yName: "Cholesterol", seriesName: 'Cholesterol', measureUnit: 'g'};
        break;
      case 'sugars':
        dataValues = {yName: "Sugars", seriesName: 'Sugars', measureUnit: 'g'};
        break;
      case 'proteins':
        dataValues = {yName: "Proteins", seriesName: 'Proteins', measureUnit: 'g'};
        break;
      case 'periods':
        dataValues = {yName: "Periods", seriesName: 'Periods', measureUnit: 'd'};
        break;
      case 'sleeps':
        dataValues = {yName: "Sleeps", seriesName: 'Sleeps', measureUnit: 'h'};
        break;
      case 'sports':
        dataValues = {yName: "Calories burned", seriesName: 'Calories burned', measureUnit: 'kcal'};
        break;
      default:
        this._toastrService.error("Data type not supported");
        break;
    }

    return dataValues;
  }
}
