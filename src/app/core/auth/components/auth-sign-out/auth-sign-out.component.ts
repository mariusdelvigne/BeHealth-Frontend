import { Component } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-auth-sign-out',
  standalone: true,
  imports: [],
  templateUrl: './auth-sign-out.component.html',
  styleUrl: './auth-sign-out.component.scss'
})
export class AuthSignOutComponent {

  constructor(private _authService: AuthService, private _router: Router, private _toastrService: ToastrService) { }

  goHome() {
    this._router.navigate(['/']);
  }

  emitSignOut() {
    this._authService.signOut().subscribe({
      next: _ => {
        this.goHome();
        this._toastrService.success('Logged out successfully');
      },
      error: (error) => {
        this._toastrService.error("Error signing you out : " + error.message);
      }
    });
  }
}
