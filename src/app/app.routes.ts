import { Routes } from '@angular/router';
import {HomeComponent} from './core/home/home.component';
import {AuthComponent} from './core/auth/auth.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'auth', component: AuthComponent },
]
