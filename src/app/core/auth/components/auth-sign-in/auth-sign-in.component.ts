import {Component} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-auth-sign-in',
  standalone: true,
  imports: [
    ReactiveFormsModule,
  ],
  templateUrl: './auth-sign-in.component.html',
  styleUrl: './auth-sign-in.component.scss',
})
export class AuthSignInComponent {
  form: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(private _authService: AuthService, private _router: Router, private _toastrService: ToastrService) {
  }

  emitSignIn() {
    this._authService.signIn(this.form.value).subscribe({
      next: _ => {
        this._router.navigate(['/']);
        this._toastrService.success('Logged in successfully');
      },
      error: (error) => {
        if (error.status === 403) {
          this._toastrService.error('User banned of the application');
        } else {
          this._toastrService.error('Error signing in : ' + error.message);
        }
      }
    });
  }
}
