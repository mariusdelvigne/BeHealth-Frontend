import { Routes } from '@angular/router';
import {HomeComponent} from './core/home/home.component';
import {AuthSignInComponent} from './core/auth/components/auth-sign-in/auth-sign-in.component';
import {AuthSignOutComponent} from './core/auth/components/auth-sign-out/auth-sign-out.component';
import {AuthSignUpComponent} from './core/auth/components/auth-sign-up/auth-sign-up.component';
import {UserSearchComponent} from './features/user/components/user-search/user-search.component';
import {PlanCreateComponent} from './features/plans/components/plan-create/plan-create.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'sign-in',
    component: AuthSignInComponent,
  },
  {
    path: 'sign-up',
    component: AuthSignUpComponent,
  },
  {
    path: 'sign-out',
    component: AuthSignOutComponent,
  },
  {
    path: 'users',
    component: UserSearchComponent,
  },
  {
    path: 'plan-create',
    component: PlanCreateComponent,
  }
]
