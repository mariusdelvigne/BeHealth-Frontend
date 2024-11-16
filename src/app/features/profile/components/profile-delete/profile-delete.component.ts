import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {ProfileService} from '../../services/profile.service';
import {ProfileDeleteCommand} from '../../utils/profile-delete-command';
import {AuthService} from '../../../../core/auth/services/auth.service';

@Component({
  selector: 'app-profile-delete',
  standalone: true,
  imports: [],
  templateUrl: './profile-delete.component.html',
  styleUrl: './profile-delete.component.css'
})
export class ProfileDeleteComponent {

  constructor(private _router: Router, private _profileService: ProfileService, private _authService: AuthService) { }

  goToProfile(): void {
    this._router.navigate(['profile']);
  }

  emitDelete(): void {
    const deleteCommand: ProfileDeleteCommand = {
      id: this._authService.getId()
    };

    this._profileService.delete(deleteCommand).subscribe({
      next: () => {
        console.log('Profile deleted successfully');
        this._router.navigate(['home']);
      }
    });
  }
}
