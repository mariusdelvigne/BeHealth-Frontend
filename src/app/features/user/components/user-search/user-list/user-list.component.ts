import {Component, Input} from '@angular/core';
import {UserOutput} from '../../../utils/user-output';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {
  @Input()
  user: UserOutput = new class implements UserOutput {
    birthdate: string = "";
    gender: string = "";
    id: number = 0;
    mail: string = "";
    name: string = "";
    role: string = "";
    surname: string = "";
    username: string = "";
  }
}
