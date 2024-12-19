import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {ProgramService} from '../../services/program.service';
import {ProgramInfoComponent} from '../../shared/program-info/program-info.component';
import {ToastrService} from 'ngx-toastr';
import {AuthService} from '../../../../core/auth/services/auth.service';
import {DebounceService} from '../../../../shared/utils/debounce.service';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-program-search-public',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ProgramInfoComponent,
    NgClass
  ],
  templateUrl: './program-search-public.component.html',
  styleUrls: [
    './program-search-public.component.scss',
  ],
})
export class ProgramSearchPublicComponent implements OnInit {
  @Input() isAdmin: boolean = false;

  programs: any[] = [];
  favoritesPrograms: any[] = [];
  subscribedPrograms: any[] = [];
  selectedProgram: any;
  form: FormGroup = new FormGroup({
    title: new FormControl(''),
  });

  relation: string = '';
  pageNumber = 1;

  constructor(private _programService: ProgramService, private _authService: AuthService, private _toastrService: ToastrService, private _debounceService: DebounceService) {
  }

  ngOnInit() {
    this.emitSearchProgram();
    this.loadData();
  }

  emitSearchProgram() {
    this._programService.getProgramsFiltered(
      "public", this.form.value.title, this.pageNumber - 1)
      .subscribe({
        next: (response) => {
          this.programs = response.programs;
          this.loadFavorites();
          this.loadSubscribed();
        }
      });
  }

  showProgramInfo(programId: number) {
    if (this.selectedProgram?.id == programId) {
      this.selectedProgram = null;
    } else {
      this.selectedProgram = null;
      this.selectedProgram = this.programs.find(program => program.id === programId);
    }
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

  addToRelations(e: MouseEvent, programId: number, relation: string) {
    e.stopPropagation();
    const userId = this._authService.getId();
    this._programService.postRelation(userId, programId, relation).subscribe({
      next: () => {
        this._toastrService.success(relation + " added successfully.");
        relation == "favorite" ? this.loadFavorites() : this.loadSubscribed();
      },
      error: () => {
        this._toastrService.error(relation + " already exists!");
      }
    });
  }

  deleteRelation(programId: number, relation: string) {
    this._programService.deleteRelation(this._authService.getId(), programId, relation).subscribe({
      next: () => {
        this._toastrService.success("Program deleted successfully from your " + relation + ".");
        relation == "favorite" ? this.loadFavorites() : this.loadSubscribed();
      },
      error: (error) => {
        this._toastrService.error("Error deleting program: " + error.message);
      }
    })
  }

  isStarred(program: any) {
    return this.favoritesPrograms.some(p => p.program.id == program.id);
  }

  isSubscribed(program: any) {
    return this.subscribedPrograms.some(p => p.program.id == program.id);
  }

  loadFavorites() {
    this._programService.getProgramsByAssociations(this._authService.getId(), 'favorite', this.pageNumber - 1)
      .subscribe(response => {
        this.favoritesPrograms = response.astHealthProgramUsers;
        console.log(this.favoritesPrograms)
      });
  }

  loadSubscribed() {
    this._programService.getProgramsByAssociations(this._authService.getId(), 'subscription', this.pageNumber - 1)
      .subscribe(response => this.subscribedPrograms = response.astHealthProgramUsers);
  }

  setRelation(relation: string) {
    this.relation = relation;
    this.loadData();
  }

  loadData() {
    this.emitSearchProgram();
    this._debounceService.debounce(() => {
      if (this.isAdmin) {
        this._programService.getProgramsFiltered('', '', this.pageNumber - 1).subscribe({
          next: (response) => {
            this.programs = response.programs;
          },
          error: (error) => {
            this._toastrService.error(error);
          }
        });
      } else {
        this._programService.getProgramsFiltered('public', '', this.pageNumber - 1).subscribe({
          next: (response) => {
            this.programs = response.programs;
            this.loadFavorites();
            this.loadSubscribed();
          },
          error: (error) => {
            this._toastrService.error(error);
          }

        });
      }
    }, 500);
  }

  matchFilter(program: any) {
    return this.relation == "favorite" && this.isStarred(program) || this.relation == "subscription" && this.isSubscribed(program) || this.relation == ""
  }

  previousPage() {
    this.pageNumber--;
    this.loadData();
  }

  nextPage() {
    this.pageNumber++;
    this.loadData();
  }
}
