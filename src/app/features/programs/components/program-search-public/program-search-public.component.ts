import {Component, OnInit} from '@angular/core';
import {FoodPlansTableComponent} from '../../../plans/shared/food-plans-table/food-plans-table.component';
import {ReactiveFormsModule} from '@angular/forms';
import {SleepPlansTableComponent} from '../../../plans/shared/sleep-plans-table/sleep-plans-table.component';
import {SportPlansTableComponent} from '../../../plans/shared/sport-plans-table/sport-plans-table.component';
import {ProgramService} from '../../services/program.service';
import {ProgramInfoComponent} from '../../shared/program-info/program-info.component';
import {ToastrService} from 'ngx-toastr';
import {AuthService} from '../../../../core/auth/services/auth.service';

@Component({
  selector: 'app-program-search-public',
  standalone: true,
  imports: [
    FoodPlansTableComponent,
    ReactiveFormsModule,
    SleepPlansTableComponent,
    SportPlansTableComponent,
    ProgramInfoComponent
  ],
  templateUrl: './program-search-public.component.html',
  styleUrls: [
    './program-search-public.component.css',
    '../../../../shared/styles/style.css',
  ],
})
export class ProgramSearchPublicComponent implements OnInit {
  programs: any[] = [];
  selectedProgram: any;

  constructor(private _programService: ProgramService, private _authService : AuthService, private _toastrService: ToastrService) {
  }

  ngOnInit() {
    this._programService.getProgramsFiltered('public').subscribe({
      next: (response) => {
        this.programs = response.programs;
      },
      error: (error) => {
        alert(error);
      }
    });
  }

  showProgramInfo(programId: number) {
    if (this.selectedProgram?.id == programId) {
      this.selectedProgram = null;
    }
    else {
      this.selectedProgram = null;
      this.selectedProgram = this.programs.find(program => program.id === programId);
    }
  }

  addToRelations(programId: number, relation: string) {
    const userId = this._authService.getId();
    this._programService.postRelation(userId, programId, relation).subscribe({
      next: response => {
        this._toastrService.success( relation + " added successfully.");
        console.log(response);
      },
      error: error => {
        this._toastrService.error( relation + " already exists!");
        console.error(error);
      }
    });
  }

}


