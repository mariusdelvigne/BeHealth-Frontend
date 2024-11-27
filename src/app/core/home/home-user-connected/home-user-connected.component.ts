import { Component } from '@angular/core';
import {AuthService} from '../../auth/services/auth.service';

@Component({
  selector: 'app-home-user-connected',
  standalone: true,
  imports: [],
  templateUrl: './home-user-connected.component.html',
  styleUrl: './home-user-connected.component.css'
})
export class HomeUserConnectedComponent {
  constructor(public authService: AuthService) {
  }
}
