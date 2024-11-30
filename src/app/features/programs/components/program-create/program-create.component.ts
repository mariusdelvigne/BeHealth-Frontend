import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../../core/auth/services/auth.service';
import {ProgramService} from '../../services/program.service';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {FoodService} from '../../../../shared/services/food.service';
import {FoodPlansTableComponent} from '../../shared/food-plans-table/food-plans-table.component';
import {SportPlansTableComponent} from '../../shared/sport-plans-table/sport-plans-table.component';
import {SleepPlansTableComponent} from '../../shared/sleep-plans-table/sleep-plans-table.component';
import {ToastrService} from 'ngx-toastr';
import {ProgramFormComponent} from '../../shared/program-form/program-form.component';

@Component({
  selector: 'app-program-create',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FoodPlansTableComponent,
    SportPlansTableComponent,
    SleepPlansTableComponent,
    ProgramFormComponent
  ],
  templateUrl: './program-create.component.html',
  styleUrl: './program-create.component.css'
})
export class ProgramCreateComponent {
  mode: string = 'create';
}
