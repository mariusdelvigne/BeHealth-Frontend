import {Component} from '@angular/core';
import {RouterLink} from "@angular/router";
import {AuthService} from '../auth/services/auth.service';
import {NotificationsDropdownViewComponent} from './notifications-dropdown-view/notifications-dropdown-view.component';
import {MdbModalModule, MdbModalRef, MdbModalService} from 'mdb-angular-ui-kit/modal';
import {AuthSignOutComponent} from '../auth/components/auth-sign-out/auth-sign-out.component';

declare var bootstrap: any;

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    NotificationsDropdownViewComponent,
    MdbModalModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  modalRef: MdbModalRef<AuthSignOutComponent> | null = null;

  constructor(public authService: AuthService, private _modalService: MdbModalService) { }

  openModal() {
    this.modalRef = this._modalService.open(AuthSignOutComponent, {
      animation: true,
      backdrop: false,
    });
  }

  collapseNavbar() {
    const navbar = document.getElementById('navbarNavAltMarkup');
    if (navbar) {
      new bootstrap.Collapse(navbar, {
        toggle: true
      });
    }
  }
}
