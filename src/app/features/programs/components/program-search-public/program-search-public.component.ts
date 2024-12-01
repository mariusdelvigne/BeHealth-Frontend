import {Component, OnInit} from '@angular/core';
import {FoodPlansTableComponent} from '../program-create/food-plans-table/food-plans-table.component';
import {ReactiveFormsModule} from '@angular/forms';
import {SleepPlansTableComponent} from '../program-create/sleep-plans-table/sleep-plans-table.component';
import {SportPlansTableComponent} from '../program-create/sport-plans-table/sport-plans-table.component';
import {ProgramService} from '../../services/program.service';
import {AuthService} from '../../../../core/auth/services/auth.service';
import {UserService} from '../../../../shared/services/user.service';
import {ProgramInfoComponent} from '../program-info/program-info.component';

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
    '../../../../shared/styles/plan-table.css',
  ],
})
export class ProgramSearchPublicComponent implements OnInit {
  programs: any[] = [];
  selectedProgram: any;

  constructor(private _programService: ProgramService, private _userService: UserService, private _authService : AuthService) {
  }

  ngOnInit() {
    this._programService.getProgramsFiltered().subscribe({
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

  addToSubscriptions(programId: number) {
    const userId = this._authService.getId();
    this._programService.postFavorite(userId, programId).subscribe({
      next: response => {
        console.log('Subscription créée avec succès:', response);
      },
      error: error => {
        console.error('Erreur lors de la création de la subscription:', error);
      }
    });
  }

}

