import {Component} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {ProgramFormComponent} from '../../shared/program-form/program-form.component';

@Component({
  selector: 'app-program-create',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ProgramFormComponent
  ],
  templateUrl: './program-create.component.html',
  styleUrl: './program-create.component.scss'
})
export class ProgramCreateComponent {
  mode: string = 'create';
}
