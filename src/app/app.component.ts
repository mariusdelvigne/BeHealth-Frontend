import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {NavbarComponent} from './core/navbar/navbar.component';
import {AuthService} from './core/auth/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'groupe3Frontend';

  constructor(private _authService: AuthService) {
    this._authService.loadData().subscribe();
  }
}
