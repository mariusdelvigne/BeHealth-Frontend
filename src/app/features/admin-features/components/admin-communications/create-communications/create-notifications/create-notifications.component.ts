import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {UserSearchOutput} from '../../../../../../shared/utils/user-search-output';
import {UserService} from '../../../../../../shared/services/user.service';
import {NotificationService} from '../../../../../../shared/services/notification.service';
import {NotificationCreateCommand} from '../../../../../notifications/utils/notification-create-command';
import {firstValueFrom} from 'rxjs';

@Component({
  selector: 'app-create-notifications',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './create-notifications.component.html',
  styleUrl: './create-notifications.component.scss'
})
export class CreateNotificationsComponent implements OnInit {
  formCreateNotification: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    category: new FormControl('General', [Validators.required]),
    user: new FormControl('', [Validators.required])
  });

  allCategories: { name: string; value: string }[] = [
    {name: "General", value: "General"},
    {name: "Plans", value: "Plans"},
    {name: "Programs", value: "Programs"}
  ];

  users: UserSearchOutput[] = [];

  constructor(private _userService: UserService, private _toastrService: ToastrService, private _notificationService: NotificationService) {
  }

  ngOnInit() {
    this._userService.getAllUsers().subscribe({
      next: (user) => {
        this.users = user.users;

        if (this.users.length > 0) {
          this.formCreateNotification.get('user')?.setValue(this.users[0].id);
        }
      },
      error: (error) => {
        this._toastrService.error('Error :' + error.message);
      }
    });
  }

  async createNotification() {
    const title = this.formCreateNotification.get('title')?.value;
    const description = this.formCreateNotification.get('description')?.value;
    const category = this.formCreateNotification.get('category')?.value;
    const userId = this.formCreateNotification.get('user')?.value;

    const userToPrint =  await firstValueFrom(this._userService.getById(userId))

    const notificationCommand: NotificationCreateCommand = {
      title: title,
      description: description,
      category: category,
      userId: userId,
    };

    const isConfirmed = window.confirm(`
    Are you sure you want to create this notifications ?
    Title : ${title}
    Description : ${description}
    Category : ${category}
    User : ${userToPrint.username}
    `);

    if (isConfirmed) {
      this._notificationService.createNotification(notificationCommand).subscribe(
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
