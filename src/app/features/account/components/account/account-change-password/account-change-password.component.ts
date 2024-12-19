import {Component} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {UserService} from '../../../../../shared/services/user.service';
import {AuthService} from '../../../../../core/auth/services/auth.service';
import {ToastrService} from 'ngx-toastr';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-account-change-password',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './account-change-password.component.html',
  styleUrl: './account-change-password.component.scss'
})
export class AccountChangePasswordComponent {
  form: FormGroup = new FormGroup({
    currentPassword: new FormControl('', Validators.required),
    newPassword: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required),
  });

  constructor(private _authService: AuthService, private _userService: UserService, private _toastrService: ToastrService) { }

  isFormValid() {
    return this.form.valid &&
      this.form.value.newPassword === this.form.value.confirmPassword;
  }

  emitChangePassword(event: SubmitEvent) {
    event.preventDefault();

    const userId = this._authService.getId();
    this._userService.createPassword(userId, {...this.form.value})
      .subscribe({
        next: () => this._toastrService.success('Password changed successfully'),
        error: e => {
          if (e.status === 400)
            this._toastrService.error('New password must contain at least 8 characters');
          else if (e.status === 401)
            this._toastrService.error('Invalid password');
          else if (e.status === 404)
            this._toastrService.error('User not found');
          else if (e.status === 409)
            this._toastrService.error('Password used too recently');
          else
            this._toastrService.error('Unable to change password');
        }
      });
  }
}
