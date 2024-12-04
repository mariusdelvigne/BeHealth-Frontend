import {Component, Input, OnInit} from '@angular/core';
import {ProgramInfoComponent} from '../../../../programs/shared/program-info/program-info.component';
import {ProgramService} from '../../../../programs/services/program.service';
import {AuthService} from '../../../../../core/auth/services/auth.service';
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-subscriptions-and-favorites',
  standalone: true,
  imports: [
    ProgramInfoComponent
  ],
  templateUrl: './subscriptions.component.html',
  styleUrls: [
    './subscriptions.component.css',
    '../../../../../shared/styles/style.css',
  ],
})
export class SubscriptionsComponent implements OnInit{
  programs: any[] = [];
  selectedProgram: any;
  relationType: string = '';

  @Input()
  set relation(value: string) {
    this.relationType = value;
    this.loadData();
    console.log(this.relationType);
  }

  loadData() {
    this._programService.getProgramsByAssociations(this._authService.getId(),this.relationType).subscribe({
      next: (response) => {
        this.programs = response.astHealthProgramUsers;
      },
      error: (error) => {
        alert(error);
      }
    });
  }

  constructor(private _programService: ProgramService, private _authService: AuthService, private _toastrService: ToastrService) {
  }

  ngOnInit() {
    this.loadData();
  }

  showProgramInfo(programId: number) {
    if (this.selectedProgram?.program.id == programId) {
      this.selectedProgram = null;
    }
    else {
      this.selectedProgram = null;
      this.selectedProgram = this.programs.find(program => program.program.id === programId);
    }
  }

  deleteRelation(programId: number, relation: string) {
    this._programService.deleteRelation(this._authService.getId(),programId, relation).subscribe({
      next: () => {
        this._toastrService.success("Program deleted successfully from your " + relation + ".");
      },
      error: (error) => {
        this._toastrService.error("Error deleting program: " + error.message);
      }
    })
  }
}
