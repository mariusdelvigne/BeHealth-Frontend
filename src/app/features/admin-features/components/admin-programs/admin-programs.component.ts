import {Component, OnInit, Output} from '@angular/core';
import {
  ProgramSearchPublicComponent
} from '../../../programs/components/program-search-public/program-search-public.component';
import {AuthService} from '../../../../core/auth/services/auth.service';

@Component({
  selector: 'app-admin-programs',
  standalone: true,
  imports: [
    ProgramSearchPublicComponent
  ],
  templateUrl: './admin-programs.component.html',
  styleUrl: './admin-programs.component.scss'
})
export class AdminProgramsComponent implements OnInit {
  @Output() isAdmin: boolean = false;

  constructor(private _authService: AuthService) {
  }

  ngOnInit() {
    this.isAdmin = this._authService.isAdmin()
  }
}
