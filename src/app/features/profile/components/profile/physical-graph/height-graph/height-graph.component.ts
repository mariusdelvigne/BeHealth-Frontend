import {Component, OnInit} from '@angular/core';
import {DatedValue} from '../../../../utils/DatedValue';
import {NgxEchartsDirective} from 'ngx-echarts';
import {DatePipe} from '@angular/common';
import {map, Observable} from 'rxjs';
import {UserHeightService} from '../../../../../../shared/services/user-height.service';
import {GraphBase} from '../../graphs/utils/graph-base';
import {GetHeightGraphOptions} from '../../graphs/utils/HeightGraphOptions';

@Component({
  selector: 'app-height-scatter-graph',
  standalone: true,
  imports: [
    DatePipe,
    NgxEchartsDirective
  ],
  templateUrl: './height-graph.component.html',
  styleUrl: './height-graph.component.css'
})
export class HeightGraphComponent extends GraphBase implements OnInit {
  constructor(datePipe: DatePipe, private _userHeightService: UserHeightService) {
    super(datePipe);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.options = GetHeightGraphOptions(this.startDate, this.endDate, this._datePipe, this.data);
  }

  override loadPageOfData(pageNumber: number, pageSize: number): Observable<DatedValue[]> {
    let response = this._userHeightService.getAllBetween(this.startDate, this.endDate, pageNumber, pageSize);
    return response.pipe(
      map(r => r.userHeights.map((d: { inputDate: string; heightInCm: number; }) => ({
          date: new Date(d.inputDate),
          value: d.heightInCm
        })
      ))
    );
  }
}
