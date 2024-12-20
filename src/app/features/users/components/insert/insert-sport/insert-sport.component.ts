import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {UserSportService} from '../../../../services/user-sport.service';
import {debounceTime} from 'rxjs';
import {SportService} from '../../../services/sport.service';
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
  allSport: { name: string; value: string }[] = [
    { name: "Running", value: "running" },
    { name: "Football", value: "soccer" },
    { name: "Basketball", value: "basketball" },
    { name: "Swimming", value: "swimming" },
    { name: "Road Cycling", value: "road cycling" },
    { name: "Yoga", value: "yoga" },
    { name: "Boxing", value: "boxing" },
    { name: "American football", value: "american football" },
    { name: "Tennis", value: "tennis" },
    { name: "Hiking", value: "hiking" },
    { name: "Rowing", value: "rowing" },
    { name: "Weight lifting", value: "weight lifting" },
    { name: "Trampoline", value: "trampoline" },
    { name: "Skiing", value: "skiing" },
    { name: "Surfing", value: "surfing" },
    { name: "Dancing", value: "dancing" },
    { name: "Walking", value: "walking" },
    { name: "Road Climbing", value: "road climbing" },
    { name: "Martial Art", value: "martial art" },
    { name: "Stretching", value: "stretching" },
    { name: "Bowling", value: "bowling" }
  ];

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
      next: () => this._toastrService.success("Created Sport successfully."),
      error: (error) => this._toastrService.error("Error creating the sport"),
    });
    this.form.reset();
  }
  updateSportList(name: string) {
    this._sportService.getAllStartingWith(name)
      .subscribe({
        next: response => this.sports = response.sports,
      });
  }
}
