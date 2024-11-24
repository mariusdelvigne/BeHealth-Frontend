import { Component } from '@angular/core';
import { NgxEchartsDirective } from 'ngx-echarts';
import { DatePipe } from '@angular/common';
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
