import { Component } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-auth-sign-out',
  standalone: true,
  imports: [],
  templateUrl: './auth-sign-out.component.html',
  styleUrl: './auth-sign-out.component.css'
})
export class AuthSignOutComponent {

  constructor(private _authService: AuthService, private _router: Router) { }

  goHome() {
    this._router.navigate(['/']);
  }

  emitSignOut() {
    this._authService.signOut().subscribe({
      next: _ => this.goHome(),
    });
  }
}
