import {Component} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {UserService} from '../../../../shared/services/user.service';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-auth-sign-up',
  standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule
    ],
  templateUrl: './auth-sign-up.component.html',
  styleUrl: './auth-sign-up.component.css',
  animations: [
    trigger('colorChange', [
      state('grey', style({
        backgroundColor: 'rgba(173, 181, 189, 0.3)',
        border: '3px solid rgba(173, 181, 189, 0.5)',
      })),
      state('blue', style({
        backgroundColor: 'rgba(13, 110, 253, 0.3)',
        border: '3px solid rgba(13, 110, 253, 0.5)',
      })),
      transition('grey <=> blue', [
        animate('1s ease-out')
      ])
    ])
  ]
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
  });

  constructor(private _authService: AuthService, private _userService: UserService, private _router: Router, private _toastrService: ToastrService) { }

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

  get colorChange() {
    return this.form.invalid ? 'grey' : 'blue';
  }

}
