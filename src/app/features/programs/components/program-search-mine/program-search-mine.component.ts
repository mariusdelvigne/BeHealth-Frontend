import {Component, OnInit} from '@angular/core';
import {ProgramInfoComponent} from '../program-info/program-info.component';
import {ProgramService} from '../../services/program.service';
import {UserService} from '../../../../shared/services/user.service';
import {AuthService} from '../../../../core/auth/services/auth.service';

@Component({
  selector: 'app-program-search-mine',
  standalone: true,
  imports: [
    ProgramInfoComponent
  ],
  templateUrl: './program-search-mine.component.html',
  styleUrls: [
    './program-search-mine.component.css',
    '../../../../shared/styles/plan-table.css',
  ],
})
export class ProgramSearchMineComponent implements OnInit{
  programs: any[] = [];
  selectedProgram: any;

  constructor(private _programService: ProgramService, private _authService: AuthService) {
  }

  ngOnInit() {
    this._programService.getProgramsByUserId(this._authService.getId()).subscribe({
      next: (response) => {
        this.programs = response.programs;
      },
      error: (error) => {
        alert(error);
      }
    });
  }

  showProgramInfo(programId: number) {
    this.selectedProgram = this.programs.find(program => program.id === programId);
  }
}
