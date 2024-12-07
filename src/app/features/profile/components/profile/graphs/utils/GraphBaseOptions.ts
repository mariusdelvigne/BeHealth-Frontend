import {EChartsOption} from 'echarts';
import {DatePipe} from '@angular/common';

export function GetGraphBaseOptions(startDate: Date, endDate: Date, datePipe: DatePipe): EChartsOption {
  return {
    xAxis: {
      name: 'Time',
      type: 'time',
      axisLabel: {
        formatter: (value: number) => {
          return `${datePipe.transform(value, 'd/M/y')}`;
        },
      },
      nameTextStyle: {
        fontWeight: 'bold',
      },
      min: startDate,
      max: endDate,
      splitNumber: 2,
    },
    yAxis: {
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
    },
  };
}
