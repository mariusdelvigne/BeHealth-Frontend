import { Routes } from '@angular/router';
import {HomeComponent} from './core/home/home.component';
import {AuthSignInComponent} from './core/auth/components/auth-sign-in/auth-sign-in.component';
import {AuthSignOutComponent} from './core/auth/components/auth-sign-out/auth-sign-out.component';
import {AuthSignUpComponent} from './core/auth/components/auth-sign-up/auth-sign-up.component';
import {UserSearchComponent} from './features/users/components/user-search/user-search.component';
import {PlanCreateComponent} from './features/plans/components/plan-create/plan-create.component';
import {PlanSearchPublicComponent} from './features/plans/components/plan-search-public/plan-search-public.component';
import {InsertComponent} from './features/users/components/insert/insert.component';
import {InsertFoodComponent} from './features/users/components/insert/insert-food/insert-food.component';
import {InsertSportComponent} from './features/users/components/insert/insert-sport/insert-sport.component';
import {InsertSleepComponent} from './features/users/components/insert/insert-sleep/insert-sleep.component';
import {InsertPeriodComponent} from './features/users/components/insert/insert-period/insert-period.component';
import {PlanSearchMineComponent} from './features/plans/components/plan-search-mine/plan-search-mine.component';
import {ProgramCreateComponent} from './features/programs/components/program-create/program-create.component';
import {AccountInformationComponent} from './features/account/components/account/account-information/account-information.component';
import {AccountDeleteComponent} from './features/account/components/account/account-delete/account-delete.component';
import {AccountComponent} from './features/account/components/account/account.component';
import {ProfileComponent} from './features/profile/components/profile/profile.component';
import {PhysicalGraphComponent} from './features/profile/components/profile/physical-graph/physical-graph.component';
import {
  WeightGraphComponent
} from './features/profile/components/profile/physical-graph/weight-graph/weight-graph.component';
import {
  HeightGraphComponent
} from './features/profile/components/profile/physical-graph/height-graph/height-graph.component';
import {
  ProgramSearchPublicComponent
} from './features/programs/components/program-search-public/program-search-public.component';
import {BmiCalculatorComponent} from './features/bmi-calculate/components/bmi-calculator/bmi-calculator.component';
import {
  NutritionCalculatorComponent
} from './features/nutrition-calculate/components/nutrition-calculator/nutrition-calculator.component';
import {
  SportCaloriesBurnedCalculatorComponent
} from './features/sport-calories-burned-calculate/components/sport-calories-burned-calculator/sport-calories-burned-calculator.component';
import {
  ProgramSearchMineComponent
} from './features/programs/components/program-search-mine/program-search-mine.component';
import {InsertPhysicalComponent} from './features/users/components/insert/insert-physical/insert-physical.component';

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
    path: 'account',
    component: AccountComponent,
    children: [
      {
        path: '',
        component: AccountInformationComponent,
      },
      {
        path: 'modify',
        component: AccountInformationComponent,
      },
      {
        path: 'delete',
        component: AccountDeleteComponent,
      }
    ]
  },
  {
    path: 'bmi-calculator',
    component: BmiCalculatorComponent,
  },
  {
    path: 'insert',
    component: InsertComponent,
    children: [
      {
        path: 'physical',
        component: InsertPhysicalComponent,
      },
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
  },
  {
    path: 'plan-search-mine',
    component: PlanSearchMineComponent,
  },
  {
    path: 'plan-search-public',
    component: PlanSearchPublicComponent,
  },
  {
    path: 'program-create',
    component: ProgramCreateComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
    children: [
      {
        path: 'physical',
        component: PhysicalGraphComponent,
        children: [
          {
            path: 'weight',
            component: WeightGraphComponent,
          },
          {
            path: 'height',
            component: HeightGraphComponent,
          },
        ]
      },
    ]
  },
  {
    path: 'program-search-public',
    component: ProgramSearchPublicComponent,
  },
  {
    path: 'program-search-mine',
    component: ProgramSearchMineComponent,
  },
  {
    path: 'bmi-calculator',
    component: BmiCalculatorComponent,
  },
  {
    path: 'nutrition-calculator',
    component: NutritionCalculatorComponent,
  },
  {
    path: 'sport-calories-burned-calculator',
    component: SportCaloriesBurnedCalculatorComponent,
  }
]
