import {Component, OnInit} from '@angular/core';
import {RouterLink} from '@angular/router';
import {AuthService} from '../../../../../core/auth/services/auth.service';
import {UserService} from '../../../../../shared/services/user.service';
import {DatePipe} from '@angular/common';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-account-information',
  standalone: true,
  imports: [
    RouterLink,
    DatePipe,
    ReactiveFormsModule
  ],
  templateUrl: './account-information.component.html',
  styleUrl: './account-information.component.css'
})
export class AccountInformationComponent implements OnInit {
  form: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    surname: new FormControl('', Validators.required),
    birthDate: new FormControl('', Validators.required),
    gender: new FormControl('Male', Validators.required),
    mail: new FormControl('', Validators.required),
  });

  constructor(private _authService: AuthService, private _userService: UserService) {
  }

  ngOnInit(): void {
    this.form.disable();
    const id = this._authService.getId();
    this._userService.getById(id).subscribe({
      next: response => {
        this.form.patchValue({
          username: response.username,
          name: response.name,
          surname: response.surname,
          birthDate: response.birthDate.split('T')[0],
          gender: response.gender,
          mail: response.mail,
        });
      }
    });
  }
}
