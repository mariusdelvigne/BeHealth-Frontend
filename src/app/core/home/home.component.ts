import {Component} from '@angular/core';
import {HomeUserConnectedComponent} from './home-user-connected/home-user-connected.component';
import {AuthService} from '../auth/services/auth.service';
import {HomeDefaultComponent} from './home-default/home-default.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HomeUserConnectedComponent,
    HomeDefaultComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(public authService: AuthService) { }
}
