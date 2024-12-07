import {EChartsOption} from 'echarts';
import {DatePipe} from '@angular/common';
import {DatedValue} from '../../../../utils/DatedValue';
import {GetGraphBaseOptions} from './GraphBaseOptions';

export function GetHeightGraphOptions(startDate: Date, endDate: Date, datePipe: DatePipe, data: DatedValue[]): EChartsOption {
  let options = GetGraphBaseOptions(startDate, endDate, datePipe);

  options.yAxis = {
    ...options.yAxis,
    name: 'Height in cm',
  };

  options.tooltip = {
    ...options.tooltip,
    formatter: (params: any) => {
      const data = params[0].data;
      return `<div class="text-center">
                <div><b>${data[1].toFixed(0)} cm</b></div>
                <div>${datePipe.transform(data[0], 'd/M/y')}</div>
              </div>`;
    },
  };

  options.series = {
      name: 'Height',
      type: 'line',
      data: data.map(d => [d.date, d.value]),
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
    };

  return options;
}
