import {Component} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {UserService} from '../../../../shared/services/user.service';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-auth-sign-up',
  standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule
    ],
  templateUrl: './auth-sign-up.component.html',
  styleUrl: './auth-sign-up.component.css'
})
export class AuthSignUpComponent {
  form: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    surname: new FormControl('', Validators.required),
    birthDate: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
    mail: new FormControl('', Validators.required),
  });

  constructor(private _authService: AuthService, private _userService: UserService, private _router: Router) {
  }

  goHome() {
    this._router.navigate(['/']);
  }

  emitSignUp() {
    this._userService.signUp(this.form.value).subscribe({
      next: () => {
        const auth = {
          username: this.form.value.username,
          password: this.form.value.password,
        };
        alert("Sign up successful");
        this._authService.signIn(auth)
        this.goHome()
      },
      error: (error) => {
        alert(error.message);
      }
    });
  }
}
