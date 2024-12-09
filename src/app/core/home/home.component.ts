import {Component} from '@angular/core';
import {AuthService} from '../auth/services/auth.service';
import {HomeDefaultComponent} from './home-default/home-default.component';
import {DashboardComponent} from '../../features/dashboard/components/dashboard/dashboard.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HomeDefaultComponent,
    DashboardComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(public authService: AuthService) { }
}
