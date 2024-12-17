import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {ProgramService} from '../../services/program.service';
import {ProgramInfoComponent} from '../../shared/program-info/program-info.component';
import {ToastrService} from 'ngx-toastr';
import {AuthService} from '../../../../core/auth/services/auth.service';
import {DebounceService} from '../../../../shared/services/debounce.service';

@Component({
  selector: 'app-program-search-public',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ProgramInfoComponent
  ],
  templateUrl: './program-search-public.component.html',
  styleUrls: [
    './program-search-public.component.scss',
  ],
})
export class ProgramSearchPublicComponent implements OnInit {
  @Input() isAdmin: boolean = false;

  programs: any[] = [];
  selectedProgram: any;
  form: FormGroup = new FormGroup({
    title: new FormControl(''),
  });

  private _debounceService = new DebounceService();

  constructor(private _programService: ProgramService, private _authService: AuthService, private _toastrService: ToastrService) {
  }

  ngOnInit() {
    this.emitSearchProgram();
    this._debounceService.debounce(() => {
      if (this.isAdmin) {
        this._programService.getProgramsFiltered().subscribe({
          next: (response) => {
            this.programs = response.programs;
          },
          error: (error) => {
            alert(error);
          }
        });
      } else {
        this._programService.getProgramsFiltered('public').subscribe({
          next: (response) => {
            this.programs = response.programs;
          },
          error: (error) => {
            alert(error);
          }
        });
      }
    }, 500);
  }

  emitSearchProgram() {
    this._programService.getProgramsFiltered(
      "public", this.form.value.title)
      .subscribe(response => this.programs = response.programs);
  }

  showProgramInfo(programId: number) {
    if (this.selectedProgram?.id == programId) {
      this.selectedProgram = null;
    } else {
      this.selectedProgram = null;
      this.selectedProgram = this.programs.find(program => program.id === programId);
    }
  }

  addToRelations(e: MouseEvent, programId: number, relation: string) {
    e.stopPropagation();

    const userId = this._authService.getId();
    this._programService.postRelation(userId, programId, relation).subscribe({
      next: response => {
        this._toastrService.success(relation + " added successfully.");
        console.log(response);
      },
      error: error => {
        this._toastrService.error(relation + " already exists!");
        console.error(error);
      }
    });
  }

  deletePrograms(program: any) {
    const isConfirmed = window.confirm('Are you sure you want to delete this programs ?');
    if (isConfirmed) {
      this._programService.deleteProgram(program.creatorId, program.id).subscribe(
        () => {
          window.location.reload();
        },
        (error) => {
          this._toastrService.error(error);
        }
      );
    }
  }
}


