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
import {RelationsComponent} from './features/profile/components/profile/relations/relations.component';
import {
  FoodDataManagerComponent
} from './features/profile/components/profile/food-data-manager/food-data-manager.component';
import {PlanUpdateComponent} from './features/plans/components/plan-update/plan-update.component';
import {ProgramUpdateComponent} from './features/programs/components/program-update/program-update.component';
import {ScatterGraphComponent} from './features/profile/shared/scatter-graph/scatter-graph.component';
import {BmiGraphComponent} from './features/profile/components/profile/physical-graph/bmi-graph/bmi-graph.component';
import {NotificationsComponent} from './features/notifications/components/notifications/notifications.component';
import {DashboardComponent} from './features/dashboard/components/dashboard/dashboard.component';
import {
  NotificationReadComponent
} from './features/notifications/components/notifications/notification-list/notification-read/notification-read.component';
import {
  AccountChangePasswordComponent
} from './features/account/components/account/account-change-password/account-change-password.component';
import {StackedBarGraphComponent} from './features/profile/shared/stacked-bar-graph/stacked-bar-graph.component';
import {AdminDashboardComponent} from './features/dashboard/components/admin-dashboard/admin-dashboard.component';
import {adminGuard} from './auth-guards/admin.guard';
import {
  PeriodDataManagerComponent
} from './features/profile/components/profile/period-data-manager/period-data-manager.component';
import {PeriodCalendarComponent} from './features/profile/shared/period-calendar/period-calendar.component';
import {BarGraphComponent} from './features/profile/shared/bar-graph/bar-graph.component';
import {
  SleepDataManagerComponent
} from './features/profile/components/profile/sleep-data-manager/sleep-data-manager.component';
import {
  ViewCommunicationsComponent
} from './features/admin-communication/components/view-communications/view-communications.component';
import {
  ViewAllNotificationsComponent
} from './features/admin-communication/components/view-communications/view-all-notifications/view-all-notifications.component';
import {
  ViewAllGlobalMessageComponent
} from './features/admin-communication/components/view-communications/view-all-global-message/view-all-global-message.component';
import {
  CreateCommunicationsComponent
} from './features/admin-communication/components/create-communications/create-communications.component';
import {
  CreateNotificationsComponent
} from './features/admin-communication/components/create-communications/create-notifications/create-notifications.component';
import {
  SportDataManagerComponent
} from './features/profile/components/profile/sport-data-manager/sport-data-manager.component';
import {
  CreateGlobalMessagesComponent
} from './features/admin-communication/components/create-communications/create-global-messages/create-global-messages.component';

export const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
  },
  {
    path: 'admin-dashboard',
    component: AdminDashboardComponent,
    canActivate: [adminGuard],
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
        path: 'password',
        component: AccountChangePasswordComponent,
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
        path: 'food-data-manager',
        component: FoodDataManagerComponent,
        children: [
          {
            path: 'scatter-graph/:dataType/:type',
            component: ScatterGraphComponent,
          },
          {
            path: 'stacked-bar-graph/:dataType/:type',
            component: StackedBarGraphComponent,
          },
        ]
      },
      {
        path: 'sport-data-manager',
        component: SportDataManagerComponent,
        children: [
          {
            path: 'scatter-graph/:dataType/:type',
            component: ScatterGraphComponent,
          },
          {
            path: 'stacked-bar-graph/:dataType/:type',
            component: StackedBarGraphComponent,
          },
        ]
      },
      {
        path: 'period-data-manager',
        component: PeriodDataManagerComponent,
        children: [
          {
            path: 'period-calendar',
            component: PeriodCalendarComponent,
          },
        ]
      },
      {
        path: 'sleep-data-manager',
        component: SleepDataManagerComponent,
        children: [
          {
            path: 'bar-graph',
            component: BarGraphComponent,
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
  },
  {
    path: 'notifications',
    component: NotificationsComponent,
    canActivate: [authGuard],
  },
  {
    path: 'notifications-reads/:id',
    component: NotificationReadComponent,
    canActivate: [authGuard],
  },
  {
    path: 'view-communication-admin',
    component: ViewCommunicationsComponent,
    canActivate: [adminGuard]
  },
  {
    path: 'view-all-notifications',
    component: ViewAllNotificationsComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'view-all-global-message',
    component: ViewAllGlobalMessageComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'create-communication-admin',
    component: CreateCommunicationsComponent,
    canActivate: [adminGuard]
  },
  {
    path: 'create-notification',
    component: CreateNotificationsComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'create-global-message',
    component: CreateGlobalMessagesComponent,
    canActivate: [adminGuard],
  }
]
