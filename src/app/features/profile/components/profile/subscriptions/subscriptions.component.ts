import {Component, Input, OnInit} from '@angular/core';
import {ProgramInfoComponent} from '../../../../programs/components/program-info/program-info.component';
import {ProgramService} from '../../../../programs/services/program.service';
import {AuthService} from '../../../../../core/auth/services/auth.service';

@Component({
  selector: 'app-subscriptions',
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
  private _relation: string = '';

  @Input()
  set relation(value: string) {
    this._relation = value;
    this.loadData();
    console.log(this._relation);
  }

  loadData() {
    this._programService.getProgramsByAssociations(this._authService.getId(),this._relation).subscribe({
      next: (response) => {
        this.programs = response.astHealthProgramUsers;
      },
      error: (error) => {
        alert(error);
      }
    });
  }

  constructor(private _programService: ProgramService, private _authService: AuthService) {
  }

  ngOnInit() {
    this.loadData();
  }

  showProgramInfo(programId: number) {
    this.selectedProgram = this.programs.find(program => program.program.id === programId);
  }
}
