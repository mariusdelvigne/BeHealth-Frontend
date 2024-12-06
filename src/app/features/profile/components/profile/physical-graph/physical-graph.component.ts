import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-physical-scatter-graph',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './physical-graph.component.html',
  styleUrls: ['./physical-graph.component.css']
})
export class PhysicalGraphComponent {

}
