import {Component, OnInit} from '@angular/core';
import {ProgramFormComponent} from '../../shared/program-form/program-form.component';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-program-update',
  standalone: true,
  imports: [
    ProgramFormComponent
  ],
  templateUrl: './program-update.component.html',
  styleUrl: './program-update.component.css'
})
export class ProgramUpdateComponent implements OnInit {
  mode: string = 'update';
  programId!: number;

  constructor(private _route: ActivatedRoute) {
  }

  ngOnInit() {
    this.programId = this._route.snapshot.params['id'];
  }
}
