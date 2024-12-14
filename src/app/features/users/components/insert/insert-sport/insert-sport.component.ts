import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {UserSportService} from '../../../../../shared/services/user-sport.service';
import {debounceTime} from 'rxjs';
import {SportService} from '../../../../../shared/services/sport.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-insert-sport',
  standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule
    ],
  templateUrl: './insert-sport.component.html',
  styleUrl: './insert-sport.component.scss',
})
export class InsertSportComponent implements OnInit {
  form: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    startDatetime: new FormControl('', Validators.required),
    endDatetime: new FormControl('', Validators.required),
  });

  sports: any[] = [];

  constructor(private _userSportService: UserSportService, private _sportService: SportService, private _toastrService: ToastrService) { }

  ngOnInit() {
    this.form.get('name')?.valueChanges
      .pipe(debounceTime(300))
      .subscribe(value => {
        this.updateSportList(value);
      });
  }

  emitUserSport() {
    this._userSportService.create(this.form.value).subscribe({
      next: response => this._toastrService.success("Created Sport successfully."),
      error: (error) => this._toastrService.error("Error creating the sport : " + error.message),
    });
  }

  get colorChange() {
    return this.form.invalid ? 'grey' : 'blue';
  }

  updateSportList(name: string) {
    this._sportService.getAllStartingWith(name)
      .subscribe({
        next: response => this.sports = response.sports,
      });
  }
}
