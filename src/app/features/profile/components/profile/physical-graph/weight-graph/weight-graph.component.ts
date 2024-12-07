import {Component, OnInit} from '@angular/core';
import {NgxEchartsDirective} from 'ngx-echarts';
import {DatePipe} from '@angular/common';
import {UserWeightService} from '../../../../../../shared/services/user-weight.service';
import {GraphBase} from '../../graphs/utils/graph-base';
import {GetWeightGraphOptions} from '../../graphs/utils/WeightGraphOptions';
import {map, Observable} from 'rxjs';
import {DatedValue} from '../../../../utils/DatedValue';

@Component({
  selector: 'app-weight-scatter-graph',
  standalone: true,
  imports: [
    DatePipe,
    NgxEchartsDirective
  ],
  templateUrl: './weight-graph.component.html',
  styleUrl: './weight-graph.component.css'
})
export class WeightGraphComponent extends GraphBase implements OnInit {
  constructor(datePipe: DatePipe, private _userWeightService: UserWeightService) {
    super(datePipe);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.options = GetWeightGraphOptions(this.startDate, this.endDate, this._datePipe, this.data);
  }

  override loadPageOfData(pageNumber: number, pageSize: number): Observable<DatedValue[]> {
    let response = this._userWeightService.getAllBetween(this.startDate, this.endDate, pageNumber, pageSize);
    return response.pipe(
      map(r => r.userWeights.map((d: { inputDate: string; weightInG: number; }) => ({
          date: new Date(d.inputDate),
          value: d.weightInG / 1000
        })
      ))
    );
  }
}
