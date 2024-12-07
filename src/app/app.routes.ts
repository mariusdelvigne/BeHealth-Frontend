import {Routes} from '@angular/router';
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
import {
  AccountInformationComponent
} from './features/account/components/account/account-information/account-information.component';
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
import {authGuard} from './auth-guards/auth.guard';
import {AuthService} from './core/auth/services/auth.service';
import {AppComponent} from './app.component';
import {RelationsComponent} from './features/profile/components/profile/relations/relations.component';
import {FoodGraphManagerComponent} from './features/profile/components/profile/food-graph/food-graph-manager.component';
import {PlanUpdateComponent} from './features/plans/components/plan-update/plan-update.component';
import {ProgramUpdateComponent} from './features/programs/components/program-update/program-update.component';
import {ScatterGraphComponent} from './features/profile/shared/scatter-graph/scatter-graph.component';
import {BmiGraphComponent} from './features/profile/components/profile/physical-graph/bmi-graph/bmi-graph.component';
import {DashboardComponent} from './features/dashboard/components/dashboard/dashboard.component';

export const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    resolve: {AuthService},
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [authGuard],
      },
      {
        path: '',
        component: HomeComponent,
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
        canActivate: [authGuard],
      },
      {
        path: 'users',
        component: UserSearchComponent,
      },
      {
        path: 'plan-create',
        component: PlanCreateComponent,
        canActivate: [authGuard],
      },
      {
        path: 'plan-update/:id',
        component: PlanUpdateComponent,
        canActivate: [authGuard],
      },
      {
        path: 'account',
        component: AccountComponent,
        canActivate: [authGuard],
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
        canActivate: [authGuard],
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
        canActivate: [authGuard],
      },
      {
        path: 'plan-search-public',
        component: PlanSearchPublicComponent,
      },
      {
        path: 'program-create',
        component: ProgramCreateComponent,
        canActivate: [authGuard],
      },
      {
        path: 'program-update/:id',
        component: ProgramUpdateComponent,
        canActivate: [authGuard],
      },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [authGuard],
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
              {
                path: 'bmi',
                component: BmiGraphComponent,
              },
            ]
          },
          {
            path: 'relations',
            component: RelationsComponent,
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
        canActivate: [authGuard],
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
    canActivate: [authGuard],
  },
  {
    path: 'users',
    component: UserSearchComponent,
  },
  {
    path: 'plan-create',
    component: PlanCreateComponent,
    canActivate: [authGuard],
  },
  {
    path: 'account',
    component: AccountComponent,
    canActivate: [authGuard],
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
    path: 'profile-delete',
    component: AccountDeleteComponent,
  },
  {
    path: 'insert',
    component: InsertComponent,
    canActivate: [authGuard],
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
    canActivate: [authGuard],
  },
  {
    path: 'plan-search-public',
    component: PlanSearchPublicComponent,
  },
  {
    path: 'program-create',
    component: ProgramCreateComponent,
    canActivate: [authGuard],
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
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [authGuard],
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
      {
        path: 'food-graph-manager',
        component: FoodGraphManagerComponent,
        children: [
          {
            path: 'food-graph/:dataType',
            component: ScatterGraphComponent,
          },
        ]
      },
      {
        path: 'relations',
        component: RelationsComponent,
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
    canActivate: [authGuard],
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
