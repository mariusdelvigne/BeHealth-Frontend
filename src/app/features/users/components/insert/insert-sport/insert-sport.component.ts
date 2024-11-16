import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {animate, state, style, transition, trigger} from '@angular/animations';
import {UserSportService} from '../../../../../shared/services/user-sport.service';
import {debounceTime} from 'rxjs';
import {SportService} from '../../../../../shared/services/sport.service';

@Component({
  selector: 'app-insert-sport',
  standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule
    ],
  templateUrl: './insert-sport.component.html',
  styleUrl: './insert-sport.component.css',
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
export class InsertSportComponent implements OnInit {
  form: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    startDatetime: new FormControl('', Validators.required),
    endDatetime: new FormControl('', Validators.required),
  });

  sports: any[] = [];

  constructor(private _userSportService: UserSportService, private _sportService: SportService) { }

  ngOnInit() {
    this.form.get('name')?.valueChanges
      .pipe(debounceTime(300))
      .subscribe(value => {
        this.updateSportList(value);
      });
  }

  emitUserSport() {
    this._userSportService.create(this.form.value).subscribe({
      next: response => alert(response),
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
