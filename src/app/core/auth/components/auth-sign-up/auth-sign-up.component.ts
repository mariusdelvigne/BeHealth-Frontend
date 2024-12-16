import {Component} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {UserService} from '../../../../shared/services/user.service';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-auth-sign-up',
  standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule
    ],
  templateUrl: './auth-sign-up.component.html',
  styleUrls: [
    './auth-sign-up.component.scss',
    '../../../../../styles.scss',
    ],
})
export class AuthSignUpComponent {
  form: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    surname: new FormControl('', Validators.required),
    birthDate: new FormControl('', Validators.required),
    gender: new FormControl('Male', Validators.required),
    mail: new FormControl('', Validators.required),
    heightInCm: new FormControl('', [Validators.required, Validators.min(1)]),
    weightInG: new FormControl('', [Validators.required, Validators.min(1)]),
  });

  constructor(private _authService: AuthService, private _userService: UserService, private _router: Router, private _toastrService: ToastrService) { }

  goHome() {
    this._router.navigate(['/']);
  }

  isHeightTouched() {
    return this.form.controls['heightInCm'].touched;
  }

  isWeightTouched() {
    return this.form.controls['weightInG'].touched;
  }
  emitSignUp() {
    const formData = {
      ...this.form.value, weightInG: this.form.value.weightInG * 1000
    };

    this._userService.signUp(formData).subscribe({
      next: () => {
        const auth = {
          username: this.form.value.username,
          password: this.form.value.password,
        };
        this._toastrService.success("Sign up successful");
        this._authService.signIn(auth)
          .subscribe({
            next: _ => this.goHome(),
          });
      },
      error: (error) => {
        this._toastrService.error("Error signing you up : " + error.message);
      }
    });
  }
}
