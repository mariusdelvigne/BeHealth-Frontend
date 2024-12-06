import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {ProfileService} from '../../../services/profile.service';
import {ProfileDeleteCommand} from '../../../utils/profile-delete-command';
import {AuthService} from '../../../../../core/auth/services/auth.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-account-delete',
  standalone: true,
  imports: [],
  templateUrl: './account-delete.component.html',
  styleUrl: './account-delete.component.css'
})
export class AccountDeleteComponent {

  constructor(private _router: Router, private _profileService: ProfileService, private _authService: AuthService, private _toastrService: ToastrService) { }

  goToProfile(): void {
    this._router.navigate(['account']);
  }

  emitDelete(): void {
    const deleteCommand: ProfileDeleteCommand = {
      id: this._authService.getId()
    };

    this._profileService.delete(deleteCommand).subscribe({
      next: () => {
        this._toastrService.success("Account deleted successfully");
        this._authService.signOut();
        this._router.navigate(['']);
      },
      error: (error) => {
        this._toastrService.error("Error deleting account : " + error.message);
      }
    });
  }
}
