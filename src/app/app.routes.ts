import { Routes } from '@angular/router';
import {HomeComponent} from './core/home/home.component';
import {AuthSignInComponent} from './core/auth/components/auth-sign-in/auth-sign-in.component';
import {AuthSignOutComponent} from './core/auth/components/auth-sign-out/auth-sign-out.component';
import {AuthSignUpComponent} from './core/auth/components/auth-sign-up/auth-sign-up.component';
import {UserSearchComponent} from './features/user/components/user-search/user-search.component';
import {PlanCreateComponent} from './features/plans/components/plan-create/plan-create.component';
import {InsertComponent} from './features/users/components/insert/insert.component';
import {InsertFoodComponent} from './features/users/components/insert/insert-food/insert-food.component';
import {InsertSportComponent} from './features/users/components/insert/insert-sport/insert-sport.component';
import {InsertSleepComponent} from './features/users/components/insert/insert-sleep/insert-sleep.component';
import {InsertPeriodComponent} from './features/users/components/insert/insert-period/insert-period.component';

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
  },
  {
    path: 'insert',
    component: InsertComponent,
    children: [
      {
        path: 'food',
        component: InsertFoodComponent,
      },
      {
        path: 'sport',
        component: InsertSportComponent,
      },
      {
        path: 'sleep',
        component: InsertSleepComponent,
      },
      {
        path: 'period',
        component: InsertPeriodComponent,
      }
    ]
  }
]
