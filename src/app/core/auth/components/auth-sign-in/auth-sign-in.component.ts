import {Component} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {NgClass} from '@angular/common';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-auth-sign-in',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgClass
  ],
  templateUrl: './auth-sign-in.component.html',
  styleUrl: './auth-sign-in.component.css',
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
export class AuthSignInComponent {
  form: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(private _authService: AuthService, private _router: Router, private _toastrService: ToastrService) { }

  emitSignIn() {
    this._authService.signIn(this.form.value).subscribe({
      next: _ => {
        this._router.navigate(['/']);
        this._toastrService.success('Logged in successfully');
      },
      error: (error) => {
        this._toastrService.error('Error signing in : ' + error.message);
      }
    });
  }

  get colorChange() {
    return this.form.invalid ? 'grey' : 'blue';
  }

}
