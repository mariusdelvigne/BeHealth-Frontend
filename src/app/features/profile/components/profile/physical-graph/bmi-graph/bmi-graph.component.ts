import {Component, OnInit} from '@angular/core';
import {DatePipe} from "@angular/common";
import {NgxEchartsDirective} from "ngx-echarts";
import {GraphBase} from '../../graphs/utils/graph-base';
import {map, Observable} from 'rxjs';
import {DatedValue} from '../../../../utils/DatedValue';
import {GetBmiGraphOptions} from '../../graphs/utils/BmiGraphOptions';
import {UserBmiService} from '../../graphs/service/user-bmi.service';

@Component({
  selector: 'app-bmi-graph',
  standalone: true,
  imports: [
    DatePipe,
    NgxEchartsDirective
  ],
  templateUrl: './bmi-graph.component.html',
  styleUrl: './bmi-graph.component.scss'
})
export class BmiGraphComponent extends GraphBase implements OnInit {
  constructor(datePipe: DatePipe, private _userBmiService: UserBmiService) {
    super(datePipe);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.options = GetBmiGraphOptions(this.startDate, this.endDate, this._datePipe, this.data);
  }

  override loadPageOfData(pageNumber: number, pageSize: number): Observable<DatedValue[]> {
    let response = this._userBmiService.getAllBetween(this.startDate, this.endDate, pageNumber, pageSize);
    return response.pipe(
      map(r => r.bmis.map((d: { date: string; bmi: number; }) => ({
          date: new Date(d.date),
          value: d.bmi
        })
      ))
    );
  }
}
