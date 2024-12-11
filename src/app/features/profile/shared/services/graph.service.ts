import { Injectable } from '@angular/core';
import {DatedValue} from '../../utils/DatedValue';
import {DatePipe} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class GraphService {

  constructor(private _datePipe: DatePipe) { }

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
}
