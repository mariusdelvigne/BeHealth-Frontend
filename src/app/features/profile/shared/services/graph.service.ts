import { Injectable } from '@angular/core';
import {GraphData} from '../utils/graph-data';
import {ToastrService} from 'ngx-toastr';
import {DatedValue} from '../../utils/DatedValue';

@Injectable({
  providedIn: 'root'
})
export class GraphService {

  constructor(private _toastrService: ToastrService) { }

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

  computeDailyTotals(groupedData: { [food: string]: { [day: string]: number } }) {
    const totals: { [day: string]: number } = { Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0, Sun: 0 };

    // Daily totals
    Object.keys(groupedData).forEach(food => {
      Object.keys(groupedData[food]).forEach(day => {
        totals[day] += groupedData[food][day];
      });
    });

    return totals;
  }
}
