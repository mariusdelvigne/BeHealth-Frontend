import {Component, OnInit} from '@angular/core';
import {ProgramInfoComponent} from '../../shared/program-info/program-info.component';
import {ProgramService} from '../../services/program.service';
import {AuthService} from '../../../../core/auth/services/auth.service';
import {PlanInfoComponent} from "../../../plans/shared/plan-info/plan-info.component";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-program-search-mine',
  standalone: true,
  imports: [
    ProgramInfoComponent,
    PlanInfoComponent,
  ],
  templateUrl: './program-search-mine.component.html',
  styleUrls: [
    './program-search-mine.component.css',
    '../../../../shared/styles/style.css',
  ],
})
export class ProgramSearchMineComponent implements OnInit{
  programs: any[] = [];
  selectedProgram: any

  constructor(private _programService: ProgramService, private _authService: AuthService, private _toastrService: ToastrService, private _route: ActivatedRoute, private _router: Router) {
  }

  ngOnInit() {
    this._programService.getProgramsByUserId(this._authService.getId()).subscribe({
      next: (response) => {
        this.programs = response.programs;
      },
      error: (error) => {
        this._toastrService.error("Error Getting programs: " + error);
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

  deleteProgram(programId: number) {
    this._programService.deleteProgram(this._authService.getId(), programId).subscribe({
      next: () => {
        this._toastrService.success("Program deleted successfully.");
      },
      error: (error) => {
        this._toastrService.error("Error deleting program: " + error.message);
      }
    });
  }

  goToUpdateForm(programId: number) {
    this._router.navigate(['program-update', programId]);
  }
}
