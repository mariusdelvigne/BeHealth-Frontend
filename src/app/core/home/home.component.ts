import {Component} from '@angular/core';
import {AuthService} from '../auth/services/auth.service';
import {HomeDefaultComponent} from './home-default/home-default.component';
import {DashboardComponent} from '../../features/dashboard/components/dashboard/dashboard.component';
import {MdbCheckboxModule} from 'mdb-angular-ui-kit/checkbox';
import {AdminDashboardComponent} from '../../features/dashboard/components/admin-dashboard/admin-dashboard.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HomeDefaultComponent,
    DashboardComponent,
    MdbCheckboxModule,
    AdminDashboardComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  adminDashboardIsChecked: boolean = false;
  constructor(public authService: AuthService) { }
}
