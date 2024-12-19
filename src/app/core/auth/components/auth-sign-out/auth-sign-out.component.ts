import {Component} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {MdbModalRef} from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-auth-sign-out',
  standalone: true,
  imports: [],
  templateUrl: './auth-sign-out.component.html',
  styleUrl: './auth-sign-out.component.scss'
})
export class AuthSignOutComponent {

  constructor(public modalRef: MdbModalRef<AuthSignOutComponent>, private _authService: AuthService, private _router: Router, private _toastrService: ToastrService) { }

  emitSignOut() {
    this._authService.signOut().subscribe({
      next: _ => {
        this.modalRef.close();
        this._toastrService.success('Logged out successfully');
        this._router.navigate(['/']);
      },
      error: (error) => {
        this._toastrService.error("Error signing you out : " + error.message);
      }
    });
  }
}
