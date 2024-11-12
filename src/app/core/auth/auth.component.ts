import { Component } from '@angular/core';
import {AuthSignInComponent} from './components/auth-sign-in/auth-sign-in.component';
import {AuthSignUpComponent} from './components/auth-sign-up/auth-sign-up.component';

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

}
