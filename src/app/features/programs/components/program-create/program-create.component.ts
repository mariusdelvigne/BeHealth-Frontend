import { Component } from '@angular/core';
import {AuthService} from '../../../../core/auth/services/auth.service';
import {ProgramService} from '../../services/program.service';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-program-create',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './program-create.component.html',
  styleUrl: './program-create.component.css'
})
export class ProgramCreateComponent {
  form: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    privacy: new FormControl('private', Validators.required),
    description: new FormControl('', Validators.required),
  });

  constructor(private _programService: ProgramService, private _authService: AuthService) {
  }

  emitCreateProgram() {
    this._programService.create(this.form.value, this._authService.getId()).subscribe({
      next: () => {
        alert("Program created successfully.");
      },
      error: (error) => {
        alert(error.message);
      }
    })
  }
}
