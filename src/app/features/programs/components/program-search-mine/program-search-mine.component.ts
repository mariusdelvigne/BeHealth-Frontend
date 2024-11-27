import {Component, OnInit} from '@angular/core';
import {ProgramInfoComponent} from '../program-info/program-info.component';
import {ProgramService} from '../../services/program.service';
import {UserService} from '../../../../shared/services/user.service';
import {AuthService} from '../../../../core/auth/services/auth.service';
import {PlanInfoComponent} from "../../../plans/components/plan-info/plan-info.component";
import {PlanUpdateFormComponent} from "../../../plans/components/plan-update-form/plan-update-form.component";
import {ToastrService} from "ngx-toastr";
import {ProgramUpdateFormComponent} from "../program-update-form/program-update-form.component";

@Component({
  selector: 'app-program-search-mine',
  standalone: true,
  imports: [
    ProgramInfoComponent,
    PlanInfoComponent,
    PlanUpdateFormComponent,
    ProgramUpdateFormComponent
  ],
  templateUrl: './program-search-mine.component.html',
  styleUrls: [
    './program-search-mine.component.css',
    '../../../../shared/styles/plan-table.css',
  ],
})
export class ProgramSearchMineComponent implements OnInit{
  programs: any[] = [];
  selectedProgram: any
  selectedUpdateProgram: any;

  constructor(private _programService: ProgramService, private _authService: AuthService, private _toastrService: ToastrService) {
  }

  ngOnInit() {
    this._programService.getProgramsByUserId(this._authService.getId()).subscribe({
      next: (response) => {
        this.programs = response.programs;
      },
      error: (error) => {
        this._toastrService.error("Error Getting programs");
      }
    });
  }

  showProgramInfo(programId: number) {
    if (this.selectedProgram?.id == programId) {
      this.selectedProgram = null;
    }
    else {
      this.selectedProgram = null;
      this.selectedUpdateProgram = null;
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

  showUpdateProgram(programId: number) {
    if (this.selectedUpdateProgram?.id == programId) {
      this.selectedUpdateProgram = null;
    }
    else {
      this.selectedUpdateProgram = null;
      this.selectedProgram = null;
      this.selectedUpdateProgram = this.programs.find(program => program.id === programId);
    }
  }
}
