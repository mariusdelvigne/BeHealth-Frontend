import {Component, OnInit} from '@angular/core';
import {RouterLink} from '@angular/router';
import {UserService} from '../../../../shared/services/user.service';
import {ToastrService} from 'ngx-toastr';
import {UserSearchOutput} from '../../../utils/user-search-output';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent implements OnInit {
  allUsers: UserSearchOutput[] = [];
  nbUsers: number = 0;
  nbUsersBan: number = 0;

  constructor(private _userService: UserService, private _toatsrService: ToastrService) { }

  ngOnInit() {
    this._userService.getAllUsers().subscribe({
      next: (allUsers) => {
        this.allUsers = allUsers.users;
        this.nbUsers = this.allUsers.length;
        this.allUsers.forEach((user)=>{
          if (user.isBanned) {
            this.nbUsersBan++;
          }
        })
      },
      error: (error) => {
        this._toatsrService.error(error);
      }
    })
  }
}
