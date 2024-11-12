import {Component, EventEmitter, Output} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthCred} from '../../utils/auth-cred';

@Component({
  selector: 'app-auth-sign-in',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './auth-sign-in.component.html',
  styleUrl: './auth-sign-in.component.css'
})
export class AuthSignInComponent {
  @Output() auth: EventEmitter<AuthCred> = new EventEmitter();

  form: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  emitSignIn() {
    this.auth.emit(this.form.value);
  }
}
