import { Component } from '@angular/core';
import {AuthSignInComponent} from './components/auth-sign-in/auth-sign-in.component';
import {AuthSignUpComponent} from './components/auth-sign-up/auth-sign-up.component';
import {Authentification} from './utils/authentification';
import {AuthService} from './services/auth.service';
import {UserService} from '../../shared/services/user.service';
import {UserCreateCommand} from './utils/user-create-command';

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

  constructor(private _authService: AuthService, private _userService: UserService) {
  }

  trySignIn(auth: Authentification) {
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

  trySignUp(userCreateCommand: UserCreateCommand) {
    this._userService.signUp(userCreateCommand).subscribe({
      next: (response) => {
          const auth = {
            username: userCreateCommand.username,
            password: userCreateCommand.password,
          };
        this._authService.signIn(auth)
        alert("Sign up successful");
      },
      error: (error) => {
        alert(error.message);
      }
    });
  }
}
