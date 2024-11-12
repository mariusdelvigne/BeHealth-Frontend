import { Component } from '@angular/core';
import {AuthSignInComponent} from './components/auth-sign-in/auth-sign-in.component';
import {AuthSignUpComponent} from './components/auth-sign-up/auth-sign-up.component';
import {AuthCred} from './utils/auth-cred';
import {AuthService} from './services/auth.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    AuthSignInComponent,
    AuthSignUpComponent
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  userCredentials: any;
  userConnected: boolean = false;

  constructor(private _authService: AuthService) {
  }

  trySignIn(auth: AuthCred) {
    this._authService.signIn(auth)
      .subscribe({
        next: (userCredentials) => {
          this.userCredentials = userCredentials;
          this.userConnected = true;
        },
        error: (error) => {
          alert(error.message);
        }
      });
  }

  trySignOut() {
    this._authService.signOut()
      .subscribe({
        next: () => {
          this.userConnected = false;
        },
        error: (error) => {
          alert(error.message);
        }
      });
  }
}
