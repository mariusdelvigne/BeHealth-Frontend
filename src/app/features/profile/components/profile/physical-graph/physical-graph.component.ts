import { Component, OnInit } from '@angular/core';
import { NgxEchartsDirective } from 'ngx-echarts';
import {EChartsOption, SeriesOption} from 'echarts';
import { DatePipe } from '@angular/common';
import { UserWeightService } from '../../../../../shared/services/user-weight.service';
import { DatedValue } from '../../../utils/DatedValue';
import { firstValueFrom } from 'rxjs';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-physical-graph',
  standalone: true,
  imports: [
    NgxEchartsDirective,
    DatePipe,
    RouterOutlet,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './physical-graph.component.html',
  styleUrls: ['./physical-graph.component.css']
})
export class PhysicalGraphComponent {

}
